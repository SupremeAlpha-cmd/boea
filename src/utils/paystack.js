// Paystack Integration for Best of Edo Award (BOEA)
// Supports both Server-Side (Vercel API using Secret Key) and Client-Side (Inline JS using Public Key)

export async function initializeServerPaystackPayment({
  email,
  amount,
  currency = 'USD',
  fullName = '',
  onError
}) {
  if (!email || !email.includes('@')) {
    if (onError) onError('A valid email address is required.');
    return false;
  }

  try {
    const res = await fetch('/api/paystack/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        fullName: fullName.trim(),
        amount: Number(amount),
        currency: currency.toUpperCase()
      })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data.error || 'Failed to connect to Paystack payment gateway.');
    }

    if (data.authorization_url) {
      // Store pending checkout details in sessionStorage for seamless unlock upon return
      sessionStorage.setItem(
        'boea_pending_ppv',
        JSON.stringify({
          email: email.trim(),
          fullName: fullName.trim(),
          amount: Number(amount),
          currency: currency.toUpperCase(),
          reference: data.reference
        })
      );

      // Redirect visitor to Paystack hosted checkout
      window.location.href = data.authorization_url;
      return true;
    }

    throw new Error('No authorization URL received from Paystack.');
  } catch (err) {
    console.error('Server-side Paystack error:', err);
    if (onError) onError(err.message || 'Payment initialization failed.');
    return false;
  }
}

export async function verifyServerPaystackPayment(reference) {
  if (!reference) return null;
  try {
    const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`);
    const data = await res.json();
    if (res.ok && data.success) {
      return data;
    }
    return null;
  } catch (err) {
    console.error('Server-side verification error:', err);
    return null;
  }
}

export function loadPaystackScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if (window.PaystackPop) {
      resolve(true);
      return;
    }
    const existing = document.getElementById('paystack-inline-js');
    if (existing) {
      existing.onload = () => resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initializePaystackPayment({
  key,
  email,
  amount,
  currency = 'USD',
  fullName = '',
  onSuccess,
  onCancel,
  onError
}) {
  if (!email || !email.includes('@')) {
    if (onError) onError('A valid email address is required for payment receipt.');
    return;
  }

  const effectiveKey = key || import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';

  // If no public key is configured, fallback automatically to server-side checkout!
  if (!effectiveKey) {
    return initializeServerPaystackPayment({
      email,
      amount,
      currency,
      fullName,
      onError
    });
  }

  const isLoaded = await loadPaystackScript();
  if (!isLoaded || !window.PaystackPop) {
    // If inline script fails to load, fallback to server-side checkout
    return initializeServerPaystackPayment({
      email,
      amount,
      currency,
      fullName,
      onError
    });
  }

  const subunitAmount = Math.round(Number(amount) * 100);
  const ref = `BOEA-PPV-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    const handler = window.PaystackPop.setup({
      key: effectiveKey.trim(),
      email: email.trim(),
      amount: subunitAmount,
      currency: currency.toUpperCase(),
      ref,
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: fullName.trim() || 'BOEA Gala Guest'
          },
          {
            display_name: 'Item Purchased',
            variable_name: 'item_purchased',
            value: 'BOEA 2026 Gala Night Live Stream Pass'
          }
        ]
      },
      callback: function (response) {
        if (onSuccess) {
          onSuccess({
            reference: response.reference || ref,
            status: 'success',
            gateway: 'paystack',
            amount: Number(amount),
            currency: currency.toUpperCase(),
            email: email.trim(),
            fullName: fullName.trim()
          });
        }
      },
      onClose: function () {
        if (onCancel) onCancel();
      }
    });

    handler.openIframe();
  } catch (err) {
    console.error('Paystack popup error, falling back to server-side:', err);
    return initializeServerPaystackPayment({
      email,
      amount,
      currency,
      fullName,
      onError
    });
  }
}
