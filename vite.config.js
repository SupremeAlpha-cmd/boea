import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const secretKey =
    env.PAYSTACK_SECRET_KEY ||
    env.PAYSTACK_TEST_SECRET_KEY ||
    '';

  return {
    plugins: [
      react(),
      {
        name: 'paystack-dev-api',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);

            if (url.pathname === '/api/paystack/initialize' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const parsed = JSON.parse(body || '{}');
                  const { email, fullName, amount = 5, currency = 'USD' } = parsed;
                  const subunitAmount = Math.round(Number(amount) * 100);
                  const ref = `BOEA-PPV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

                  const protocol = req.headers['x-forwarded-proto'] || 'http';
                  const host = req.headers.host || 'localhost:3000';
                  const origin = `${protocol}://${host}`;

                  const pRes = await fetch('https://api.paystack.co/transaction/initialize', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${secretKey.trim()}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      email: (email || '').trim(),
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

                  const data = await pRes.json();
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = pRes.status;
                  res.end(
                    JSON.stringify(
                      data.status
                        ? {
                            authorization_url: data.data.authorization_url,
                            access_code: data.data.access_code,
                            reference: ref
                          }
                        : { error: data.message || 'Initialization failed' }
                    )
                  );
                } catch (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
              return;
            }

            if (url.pathname === '/api/paystack/verify' && req.method === 'GET') {
              const reference = url.searchParams.get('reference') || url.searchParams.get('verify_ref');
              if (!reference) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing reference' }));
                return;
              }
              try {
                const pRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
                  headers: {
                    Authorization: `Bearer ${secretKey.trim()}`,
                    'Content-Type': 'application/json'
                  }
                });
                const data = await pRes.json();
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = pRes.status;
                if (data.status && data.data.status === 'success') {
                  res.end(
                    JSON.stringify({
                      success: true,
                      reference: data.data.reference,
                      amount: data.data.amount / 100,
                      currency: data.data.currency,
                      email: data.data.customer?.email,
                      paidAt: data.data.paid_at,
                      status: 'success'
                    })
                  );
                } else {
                  res.end(JSON.stringify({ error: data.message || 'Verification failed' }));
                }
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
              return;
            }

            next();
          });
        }
      }
    ],
    server: {
      port: 3000,
      host: true
    }
  };
});
