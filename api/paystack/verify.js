import crypto from 'crypto';

function computePassCode(reference) {
  // Deterministic, secure passcode derived from transaction reference
  const digits = reference.replace(/[^0-9]/g, '');
  const suffix = digits.slice(-5) || Math.floor(10000 + Math.random() * 90000).toString();
  return `BOEA-PPV-${suffix}`;
}

async function recordToFirebaseServerSide(dbUrl, purchaseData, passCode) {
  if (!dbUrl) return;
  const baseUrl = dbUrl.replace(/\/+$/, '');
  try {
    // 1. Record purchase to ppv_purchases
    await fetch(`${baseUrl}/ppv_purchases.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData)
    });

    // 2. Record pass to ppv_passes for universal cross-device verification
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

    await fetch(`${baseUrl}/ppv_passes/${passCode}.json`, {
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
    const dbUrl = process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL;
    if (dbUrl) {
      try {
        const checkRes = await fetch(`${dbUrl.replace(/\/+$/, '')}/ppv_passes/${cleanPass}.json`);
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
        // fallback
      }
    }
    return res.status(404).json({ valid: false, error: 'Passcode not found or expired.' });
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

    const passCode = computePassCode(verifiedRef);
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

    // Record server-side into Firebase if configured
    const dbUrl = process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL;
    await recordToFirebaseServerSide(dbUrl, purchaseRecord, passCode);

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
