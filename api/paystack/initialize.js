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
    const { email, fullName, amount = 5, currency = 'USD' } = body || {};

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

    const subunitAmount = Math.round(Number(amount) * 100);
    const ref = `BOEA-PPV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.trim(),
        amount: subunitAmount,
        currency: currency.toUpperCase(),
        reference: ref,
        callback_url: `${origin}/live?verify_ref=${ref}`,
        metadata: {
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: (fullName || 'BOEA Gala Guest').trim()
            },
            {
              display_name: 'Item Purchased',
              variable_name: 'item_purchased',
              value: 'BOEA 2026 Gala Night Live Stream Pass'
            }
          ]
        }
      })
    });

    const data = await paystackRes.json();

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
