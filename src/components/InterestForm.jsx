import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import './InterestForm.css';

export default function InterestForm({ title, subtitle, options, submitLabel = 'Submit' }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="interest-form interest-form-success">
        <CheckCircle2 size={40} className="interest-success-icon" />
        <h3 className="headline-md interest-success-title">Thank You</h3>
        <p className="body-md interest-success-text">
          Your details have been received. Our team will contact you shortly.
          {options.length > 0 &&
            ' Payment links will be shared with you once your request is confirmed.'}
        </p>
      </div>
    );
  }

  return (
    <form
      className="interest-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {title && <h3 className="headline-md interest-form-title">{title}</h3>}
      {subtitle && <p className="body-md text-muted interest-form-subtitle">{subtitle}</p>}

      {options.length > 0 && (
        <label className="interest-field">
          <span className="label-caps interest-label">I am interested in</span>
          <select className="interest-select" required defaultValue={options[0]}>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>
      )}

      <div className="interest-row">
        <label className="interest-field">
          <span className="label-caps interest-label">Full Name</span>
          <input type="text" className="interest-input" required placeholder="Your name" />
        </label>
        <label className="interest-field">
          <span className="label-caps interest-label">Email Address</span>
          <input type="email" className="interest-input" required placeholder="you@example.com" />
        </label>
      </div>

      <div className="interest-row">
        <label className="interest-field">
          <span className="label-caps interest-label">Phone / WhatsApp</span>
          <input type="tel" className="interest-input" placeholder="+234..." />
        </label>
        <label className="interest-field">
          <span className="label-caps interest-label">Organisation (optional)</span>
          <input type="text" className="interest-input" placeholder="Company / institution" />
        </label>
      </div>

      <label className="interest-field">
        <span className="label-caps interest-label">Message</span>
        <textarea className="interest-textarea" rows={4} placeholder="Tell us a little more..." />
      </label>

      <button type="submit" className="btn btn-gold interest-submit">
        {submitLabel}
      </button>
    </form>
  );
}
