import crypto from 'crypto';

function computeSignedPassCode(reference, secretKey) {
  const cleanRef = (reference || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const token = cleanRef.slice(-6) || Math.floor(100000 + Math.random() * 900000).toString();
  const sig = crypto.createHmac('sha256', secretKey).update(token).digest('hex').slice(0, 4).toUpperCase();
  return `BOEA-PPV-${token}-${sig}`;
}

function verifyPassCodeSignature(code, secretKey) {
  if (!code || typeof code !== 'string') return false;
  const clean = code.trim().toUpperCase();
  const match = clean.match(/^BOEA-PPV-([A-Z0-9]+)-([A-Z0-9]{4})$/);
  if (!match) return false;
  const [, token, sig] = match;
  const expectedSig = crypto.createHmac('sha256', secretKey).update(token).digest('hex').slice(0, 4).toUpperCase();
  return sig === expectedSig;
}

async function recordToFirebaseServerSide(dbUrl, dbSecret, purchaseData, passCode) {
  if (!dbUrl) return;
  const baseUrl = dbUrl.replace(/\/+$/, '');
  const authParam = dbSecret ? `?auth=${encodeURIComponent(dbSecret.trim())}` : '';
  try {
    // 1. Record purchase to ppv_purchases using server auth
    await fetch(`${baseUrl}/ppv_purchases.json${authParam}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData)
    });

    // 2. Record pass to ppv_passes using server auth
    const passRecord = {
      passCode,
      reference: purchaseData.reference,
      email: purchaseData.email,
      fullName: purchaseData.fullName,
      amount: purchaseData.amount,
      currency: purchaseData.currency,
      active: true,
      createdAt: purchaseData.createdAt
    };

    await fetch(`${baseUrl}/ppv_passes/${encodeURIComponent(passCode)}.json${authParam}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passRecord)
    });
  } catch (err) {
    console.error('Server-side Firebase record error:', err.message);
  }
}

export default async function handler(req, res) {
  const secretKey =
    process.env.PAYSTACK_SECRET_KEY ||
    process.env.PAYSTACK_TEST_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({ error: 'PAYSTACK_SECRET_KEY is not configured in environment variables.' });
  }

  const dbSecret = process.env.FIREBASE_DATABASE_SECRET || process.env.FIREBASE_ADMIN_SECRET || '';
  const authParam = dbSecret ? `?auth=${encodeURIComponent(dbSecret.trim())}` : '';

  const query = req.query || {};
  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // ignore
    }
  }

  const reference = query.reference || query.verify_ref || body.reference;
  const passcode = query.passcode || body.passcode;

  // Case A: Querying validation for a Passcode across devices
  if (!reference && passcode) {
    const cleanPass = passcode.trim().toUpperCase();

    // 1. Cryptographic HMAC verification: instant and zero database dependency
    if (verifyPassCodeSignature(cleanPass, secretKey)) {
      return res.status(200).json({
        valid: true,
        passCode: cleanPass,
        label: 'Verified PPV Pass'
      });
    }

    // 2. Authenticated server read from Firebase ppv_passes
    const dbUrl = process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL;
    if (dbUrl) {
      try {
        const checkRes = await fetch(
          `${dbUrl.replace(/\/+$/, '')}/ppv_passes/${encodeURIComponent(cleanPass)}.json${authParam}`
        );
        if (checkRes.ok) {
          const passData = await checkRes.json();
          if (passData && passData.active) {
            return res.status(200).json({
              valid: true,
              passCode: cleanPass,
              label: `Paid PPV Pass (${passData.currency || 'USD'} ${passData.amount || 5})`,
              reference: passData.reference,
              email: passData.email
            });
          }
        }
      } catch (e) {
        // fallback to direct verification
      }
    }

    // 3. Fallback: Check if the user entered their Paystack transaction reference as the code
    try {
      const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(cleanPass)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey.trim()}`,
          'Content-Type': 'application/json'
        }
      });
      const pData = await paystackRes.json();
      if (paystackRes.ok && pData.status && pData.data.status === 'success') {
        const { amount, currency, customer } = pData.data;
        const cur = (currency || '').toUpperCase();
        const isSufficient = (cur === 'USD' && amount >= 500) || (cur === 'NGN' && amount >= 750000);
        if (isSufficient) {
          return res.status(200).json({
            valid: true,
            passCode: cleanPass,
            label: `Verified PPV Pass (${cur} ${amount / 100})`,
            reference: cleanPass,
            email: customer?.email
          });
        }
      }
    } catch (e) {
      // ignore
    }

    return res.status(404).json({ valid: false, error: 'Passcode not found or invalid.' });
  }

  if (!reference) {
    return res.status(400).json({ error: 'Transaction reference is required' });
  }

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey.trim()}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await paystackRes.json();

    if (!paystackRes.ok || !data.status || data.data.status !== 'success') {
      return res.status(400).json({
        success: false,
        error: data.message || 'Payment verification failed or pending.'
      });
    }

    const { amount, currency, customer, reference: verifiedRef, paid_at, metadata } = data.data;

    // Security Check: Enforce minimum required price to prevent penny bypass
    const isSponsorship = metadata?.item_type === 'sponsorship';
    if (!isSponsorship) {
      const cur = (currency || '').toUpperCase();
      if (cur === 'USD' && amount < 500) {
        return res.status(400).json({
          success: false,
          error: 'Insufficient payment amount: $5.00 USD required.'
        });
      }
      if (cur === 'NGN' && amount < 750000) {
        return res.status(400).json({
          success: false,
          error: 'Insufficient payment amount: ₦7,500 NGN minimum required.'
        });
      }
    }

    // Generate tamper-proof HMAC signed passcode
    const passCode = computeSignedPassCode(verifiedRef, secretKey);

    const purchaseRecord = {
      reference: verifiedRef,
      email: customer?.email || '',
      fullName: metadata?.customer_name || 'BOEA Gala Patron',
      amount: amount / 100,
      currency: (currency || 'USD').toUpperCase(),
      gateway: 'paystack',
      passCode,
      status: 'success',
      ts: Date.now(),
      createdAt: paid_at || new Date().toISOString()
    };

    // Authenticated server-side recording into Firebase
    const dbUrl = process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL;
    await recordToFirebaseServerSide(dbUrl, dbSecret, purchaseRecord, passCode);

    return res.status(200).json({
      success: true,
      valid: true,
      reference: verifiedRef,
      passCode,
      amount: amount / 100,
      currency,
      email: customer?.email || '',
      paidAt: paid_at,
      status: 'success'
    });
  } catch (error) {
    console.error('Server verification error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
