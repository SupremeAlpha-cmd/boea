export default async function handler(req, res) {
  const reference = req.query?.reference || req.query?.verify_ref || (req.body && req.body.reference);

  if (!reference) {
    return res.status(400).json({ error: 'Transaction reference is required' });
  }

  try {
    const secretKey =
      process.env.PAYSTACK_SECRET_KEY ||
      process.env.PAYSTACK_TEST_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ error: 'PAYSTACK_SECRET_KEY is not configured in environment variables.' });
    }

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
        error: data.message || 'Payment verification failed or pending.'
      });
    }

    const { amount, currency, customer, reference: verifiedRef, paid_at } = data.data;

    return res.status(200).json({
      success: true,
      reference: verifiedRef,
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
