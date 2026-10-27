import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import initializeHandler from './api/paystack/initialize.js';
import verifyHandler from './api/paystack/verify.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for the server handlers in local dev
  process.env.PAYSTACK_SECRET_KEY = env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY || '';
  process.env.PAYSTACK_TEST_SECRET_KEY = env.PAYSTACK_TEST_SECRET_KEY || process.env.PAYSTACK_TEST_SECRET_KEY || '';
  process.env.FIREBASE_DATABASE_URL = env.VITE_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL || '';
  process.env.FIREBASE_DATABASE_SECRET = env.FIREBASE_DATABASE_SECRET || process.env.FIREBASE_DATABASE_SECRET || '';

  return {
    plugins: [
      react(),
      {
        name: 'paystack-dev-api',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);

            if (url.pathname === '/api/paystack/initialize' || url.pathname === '/api/paystack/verify') {
              // Polyfill query and helper response methods for Vite connect middleware
              req.query = Object.fromEntries(url.searchParams);
              if (!res.status) {
                res.status = function (code) {
                  this.statusCode = code;
                  return this;
                };
              }
              if (!res.json) {
                res.json = function (payload) {
                  this.setHeader('Content-Type', 'application/json');
                  this.end(JSON.stringify(payload));
                  return this;
                };
              }

              if (req.method === 'POST' && !req.body) {
                let rawBody = '';
                for await (const chunk of req) {
                  rawBody += chunk;
                }
                try {
                  req.body = JSON.parse(rawBody);
                } catch {
                  req.body = rawBody;
                }
              }

              if (url.pathname === '/api/paystack/initialize') {
                return initializeHandler(req, res);
              }
              if (url.pathname === '/api/paystack/verify') {
                return verifyHandler(req, res);
              }
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
