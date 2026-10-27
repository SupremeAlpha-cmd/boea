import { useState, useEffect } from 'react';
import { CheckCircle2, CreditCard, Lock, Banknote, Loader2, AlertCircle } from 'lucide-react';
import CustomSelect from './CustomSelect';
import './InterestForm.css';

const PRESET_AMOUNTS = [
  { label: '₦50,000', value: 50000 },
  { label: '₦100,000', value: 100000 },
  { label: '₦250,000', value: 250000 },
  { label: '₦500,000', value: 500000 },
  { label: '₦1,000,000', value: 1000000 }
];

export default function InterestForm({ title, subtitle, options = [], submitLabel = 'Proceed to Paystack Payment' }) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [formData, setFormData] = useState({
    interestType: options?.[0] || 'Individual donation',
    fullName: '',
    email: '',
    phone: '',
    organisation: '',
    amount: 50000,
    message: ''
  });

  // Check for return from real Paystack checkout redirect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    const ref = params.get('ref') || params.get('reference');
    if (status === 'confirmed' && ref) {
      setSubmitted(true);
      setConfirmedRef(ref);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleAmountSelect = (val) => {
    if (val === 'custom') {
      setIsCustomAmount(true);
    } else {
      setIsCustomAmount(false);
      setFormData((prev) => ({ ...prev, amount: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim() || !formData.email.trim()) {
      setError('Please provide your full name and a valid email address.');
      return;
    }

    const payAmount = Number(formData.amount);
    if (!payAmount || payAmount < 1000) {
      setError('Minimum contribution amount is ₦1,000 NGN.');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          fullName: formData.fullName.trim(),
          amount: payAmount,
          currency: 'NGN',
          item: 'sponsorship',
          phone: formData.phone.trim(),
          organisation: formData.organisation.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.authorization_url) {
        // Redirect to real Paystack secure checkout
        window.location.href = data.authorization_url;
      } else {
        setError(data.error || 'Payment initialization failed. Please try again.');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Paystack initialization error:', err);
      setError('Network connection error. Please check your connection and try again.');
      setIsProcessing(false);
    }
  };

  return (
    <>
      {submitted ? (
        <div className="interest-form interest-form-success">
          <CheckCircle2 size={40} className="interest-success-icon" />
          <h3 className="headline-md interest-success-title">Thank You for Your Support!</h3>
          <p className="body-md interest-success-text">
            Your pledge and payment confirmation have been successfully received. Our team will contact you shortly.
          </p>
          {confirmedRef && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-gold)', fontFamily: 'monospace' }}>
              Reference: {confirmedRef}
            </div>
          )}
          <button
            type="button"
            className="btn btn-outline margin-top-md"
            onClick={() => {
              setSubmitted(false);
              setConfirmedRef('');
            }}
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form className="interest-form" onSubmit={handleSubmit}>
          {title && <h3 className="headline-md interest-form-title">{title}</h3>}
          {subtitle && <p className="body-md text-muted interest-form-subtitle">{subtitle}</p>}

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {options.length > 0 && (
            <div className="interest-field">
              <CustomSelect
                label="I am interested in"
                options={options}
                value={formData.interestType}
                onChange={(val) => setFormData({ ...formData, interestType: val })}
              />
            </div>
          )}

          <div className="interest-row">
            <label className="interest-field">
              <span className="label-caps interest-label">Full Name *</span>
              <input
                type="text"
                className="interest-input"
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </label>
            <label className="interest-field">
              <span className="label-caps interest-label">Email Address *</span>
              <input
                type="email"
                className="interest-input"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>
          </div>

          <div className="interest-row">
            <label className="interest-field">
              <span className="label-caps interest-label">Phone / WhatsApp</span>
              <input
                type="tel"
                className="interest-input"
                placeholder="+234..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </label>

            <label className="interest-field">
              <span className="label-caps interest-label">Organisation (optional)</span>
              <input
                type="text"
                className="interest-input"
                placeholder="Company / institution"
                value={formData.organisation}
                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              />
            </label>
          </div>

          {/* Brand-Aware Pricing Selector */}
          <div className="interest-pricing-box">
            <div className="interest-pricing-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Banknote size={16} className="gold-text" />
                <span className="label-caps interest-label" style={{ margin: 0 }}>Select Contribution Package</span>
              </div>
            </div>

            <div className="interest-pricing-chips">
              {PRESET_AMOUNTS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`interest-price-chip ${!isCustomAmount && formData.amount === p.value ? 'active' : ''}`}
                  onClick={() => handleAmountSelect(p.value)}
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                className={`interest-price-chip ${isCustomAmount ? 'active' : ''}`}
                onClick={() => handleAmountSelect('custom')}
              >
                Custom Amount
              </button>
            </div>

            {isCustomAmount && (
              <div className="interest-field margin-top-sm">
                <span className="label-caps interest-label">Enter Custom Amount (NGN)</span>
                <input
                  type="number"
                  className="interest-input"
                  placeholder="e.g. 75000"
                  min={1000}
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>
            )}
          </div>

          <label className="interest-field margin-top-md">
            <span className="label-caps interest-label">Message / Note</span>
            <textarea
              className="interest-textarea"
              rows={3}
              placeholder="Tell us a little more about your pledge or interest..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </label>

          <button
            type="submit"
            disabled={isProcessing}
            className="btn btn-gold interest-submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              opacity: isProcessing ? 0.7 : 1,
              cursor: isProcessing ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? (
              <>
                <Loader2 size={18} className="spin-animation" />
                Connecting to Paystack Secure Checkout...
              </>
            ) : (
              <>
                <CreditCard size={18} />
                {submitLabel} — ₦{Number(formData.amount).toLocaleString('en-NG')}
              </>
            )}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              fontSize: '11px',
              color: 'var(--on-surface-variant)',
              marginTop: '0.75rem'
            }}
          >
            <Lock size={12} className="gold-text" />
            <span>Encrypted checkout powered by Paystack</span>
          </div>
        </form>
      )}
    </>
  );
}
