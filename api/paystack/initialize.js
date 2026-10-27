async function getLiveUsdToNgnRate() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: controller.signal
    });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      if (data?.rates?.NGN && data.rates.NGN > 500) {
        return Math.round(data.rates.NGN);
      }
    }
  } catch {}
  return 1550; // Resilient default rate
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // ignore
      }
    }
    const { email, fullName, item = 'ppv_pass', amount, currency = 'USD', phone = '', organisation = '' } = body || {};

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const secretKey =
      process.env.PAYSTACK_SECRET_KEY ||
      process.env.PAYSTACK_TEST_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ error: 'PAYSTACK_SECRET_KEY is not configured in environment variables.' });
    }

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'bestofedoaward.com';
    const origin = `${protocol}://${host}`;

    const isSponsorship = item === 'sponsorship';
    const ref = `BOEA-${isSponsorship ? 'SPONSOR' : 'PPV'}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let targetCurrency = 'USD';
    let subunitAmount = 500; // $5 USD fixed for PPV
    let itemDescription = 'BOEA 2026 Gala Night Live Stream Pass';
    let callbackUrl = `${origin}/live?verify_ref=${ref}`;

    if (isSponsorship) {
      targetCurrency = 'NGN';
      const cleanAmount = Math.max(1000, Number(amount) || 50000);
      subunitAmount = Math.round(cleanAmount * 100);
      itemDescription = `BOEA 2026 Sponsorship / Donation (${organisation ? organisation + ' - ' : ''}${fullName || 'Supporter'})`;
      callbackUrl = `${origin}/partners?status=confirmed&ref=${ref}`;
    } else {
      // Security: PPV Pass price is strictly controlled by the server.
      // Client cannot request a $0.01 or discounted pass.
      targetCurrency = (currency || 'USD').toUpperCase();
      subunitAmount = 500; // 500 cents = $5.00 USD
    }

    const createPayload = (cur, subAmount) => ({
      email: email.trim(),
      amount: subAmount,
      currency: cur,
      reference: ref,
      callback_url: callbackUrl,
      metadata: {
        item_type: isSponsorship ? 'sponsorship' : 'ppv_pass',
        expected_usd_cents: isSponsorship ? 0 : 500,
        expected_min_ngn_kobo: isSponsorship ? subunitAmount : 750000, // ₦7,500 floor
        customer_name: (fullName || 'BOEA Gala Guest').trim(),
        phone: phone ? phone.trim() : undefined,
        organisation: organisation ? organisation.trim() : undefined,
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: (fullName || 'BOEA Gala Guest').trim()
          },
          {
            display_name: 'Item Purchased',
            variable_name: 'item_purchased',
            value: itemDescription
          }
        ]
      }
    });

    let paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createPayload(targetCurrency, subunitAmount))
    });

    let data = await paystackRes.json();

    // If the merchant account rejects USD with a currency unsupported error,
    // automatically fall back to the live NGN equivalent (minimum ₦7,500 floor).
    if (!paystackRes.ok || !data.status) {
      if (data.message && data.message.toLowerCase().includes('currency')) {
        targetCurrency = 'NGN';
        const liveRate = await getLiveUsdToNgnRate();
        const ngnTotal = Math.max(7500, Math.round(5 * liveRate));
        const ngnSubunit = Math.round(ngnTotal * 100);

        paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secretKey.trim()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(createPayload(targetCurrency, ngnSubunit))
        });
        data = await paystackRes.json();
      }
    }

    if (!paystackRes.ok || !data.status) {
      console.error('Paystack initialization error:', data);
      return res.status(400).json({
        error: data.message || 'Paystack initialization failed. Please try again.'
      });
    }

    return res.status(200).json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: ref
    });
  } catch (error) {
    console.error('Server initialization error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
