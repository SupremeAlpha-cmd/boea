import { useState } from 'react';
import { CheckCircle2, CreditCard, Lock, Banknote } from 'lucide-react';
import CustomSelect from './CustomSelect';
import PaystackModal from './PaystackModal';
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
  const [showPaystack, setShowPaystack] = useState(false);
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

  const handleAmountSelect = (val) => {
    if (val === 'custom') {
      setIsCustomAmount(true);
    } else {
      setIsCustomAmount(false);
      setFormData(prev => ({ ...prev, amount: val }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPaystack(true);
  };

  return (
    <>
      {submitted ? (
        <div className="interest-form interest-form-success">
          <CheckCircle2 size={40} className="interest-success-icon" />
          <h3 className="headline-md interest-success-title">Thank You for Your Support!</h3>
          <p className="body-md interest-success-text">
            Your details have been submitted and payment confirmation received. Our team will contact you via email ({formData.email}) shortly.
          </p>
          <button
            type="button"
            className="btn btn-outline margin-top-md"
            onClick={() => { setSubmitted(false); setShowPaystack(false); }}
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form className="interest-form" onSubmit={handleSubmit}>
          {title && <h3 className="headline-md interest-form-title">{title}</h3>}
          {subtitle && <p className="body-md text-muted interest-form-subtitle">{subtitle}</p>}

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
              <span className="label-caps interest-label">Full Name</span>
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
              <span className="label-caps interest-label">Email Address</span>
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

          <button type="submit" className="btn btn-gold interest-submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
            <CreditCard size={18} />
            {submitLabel} — ₦{Number(formData.amount).toLocaleString('en-NG')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '0.75rem' }}>
            <Lock size={12} className="gold-text" />
            <span>Encrypted payment checkout powered by Paystack</span>
          </div>
        </form>
      )}

      {/* Paystack Modal Launcher */}
      <PaystackModal
        isOpen={showPaystack}
        formData={formData}
        onClose={() => {
          setShowPaystack(false);
          setSubmitted(true);
        }}
      />
    </>
  );
}
