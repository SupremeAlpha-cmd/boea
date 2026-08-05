import { useState } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, Award, User, FileText, Send } from 'lucide-react';
import './NominationForm.css';

const CATEGORY_OPTIONS = [
  'Cultural Heritage Preservation',
  'Global Leadership & Impact',
  'Innovation in Arts & Design',
  'Business & Entrepreneurship',
  'Public Service & Leadership',
  'Education & Academic Excellence',
  'Healthcare & Medical Service',
  'Media & Communication',
  'Technology & Digital Innovation',
  'Humanitarian & Social Impact',
  'Youth Leadership & Rising Star',
  'Lifetime Achievement'
];

export default function NominationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: CATEGORY_OPTIONS[0],
    nomineeName: '',
    nomineeEmail: '',
    nomineePhone: '',
    nomineeOrg: '',
    nomineeLocation: '',
    citation: '',
    achievements: '',
    supportingLink: '',
    nominatorName: '',
    nominatorEmail: '',
    nominatorPhone: '',
    relationship: 'Colleague / Professional'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep((s) => Math.min(s + 1, 3));
  };

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="nomination-form-container nomination-success-card">
        <div className="success-icon-badge">
          <CheckCircle2 size={48} className="success-icon" />
        </div>
        <h3 className="headline-lg nomination-success-title">Nomination Received</h3>
        <p className="body-lg text-muted nomination-success-text">
          Thank you, <strong>{formData.nominatorName}</strong>. Your official nomination for{' '}
          <strong>{formData.nomineeName || 'your nominee'}</strong> under the{' '}
          <span className="gold-text">{formData.category}</span> category has been logged for the 9th Edition 2026.
        </p>
        <div className="nomination-success-box">
          <p className="caption text-muted">
            Our vetting committee will review all submissions. Shortlisted nominees will be contacted via email prior to the public announcement.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline margin-top-md"
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
        >
          Submit Another Nomination
        </button>
      </div>
    );
  }

  return (
    <div className="nomination-form-container">
      <div className="nomination-form-header">
        <span className="label-caps gold-text">Official Entry Portal</span>
        <h2 className="headline-xl">Submit a 2026 Nomination</h2>
        <p className="body-md text-muted">
          Complete the form below to nominate an outstanding individual or organisation.
        </p>
      </div>

      {/* Segmented Step Header Bar */}
      <div className="nomination-step-bar">
        <button
          type="button"
          className={`step-tab ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
          onClick={() => setStep(1)}
        >
          <span className="step-num">{step > 1 ? '✓' : '1'}</span>
          <span className="step-title-text">1. Nominee Profile</span>
        </button>
        <button
          type="button"
          className={`step-tab ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
          onClick={() => step > 1 && setStep(2)}
        >
          <span className="step-num">{step > 2 ? '✓' : '2'}</span>
          <span className="step-title-text">2. Citation & Impact</span>
        </button>
        <button
          type="button"
          className={`step-tab ${step === 3 ? 'active' : ''}`}
          onClick={() => step > 2 && setStep(3)}
        >
          <span className="step-num">3</span>
          <span className="step-title-text">3. Nominator Info</span>
        </button>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : handleNext} className="nomination-form-body">
        {step === 1 && (
          <div className="form-step-content">
            <div className="step-section-heading">
              <Award size={22} className="step-section-icon" />
              <div>
                <h3 className="step-section-title">Step 1: Category & Nominee Details</h3>
                <p className="caption text-muted">Identify the candidate and category for nomination.</p>
              </div>
            </div>

            <div className="nom-field">
              <label className="nom-label">
                Award Category <span className="required-star">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="nom-select"
                required
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="nom-row">
              <div className="nom-field">
                <label className="nom-label">
                  Nominee Full Name / Organisation <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Osasere Omoregie"
                  className="nom-input"
                  required
                />
              </div>
              <div className="nom-field">
                <label className="nom-label">Organisation / Affiliation</label>
                <input
                  type="text"
                  name="nomineeOrg"
                  value={formData.nomineeOrg}
                  onChange={handleChange}
                  placeholder="e.g. Benin Cultural Institute"
                  className="nom-input"
                />
              </div>
            </div>

            <div className="nom-row">
              <div className="nom-field">
                <label className="nom-label">Nominee Email Address</label>
                <input
                  type="email"
                  name="nomineeEmail"
                  value={formData.nomineeEmail}
                  onChange={handleChange}
                  placeholder="nominee@example.com"
                  className="nom-input"
                />
              </div>
              <div className="nom-field">
                <label className="nom-label">
                  Nominee Location / Base <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  name="nomineeLocation"
                  value={formData.nomineeLocation}
                  onChange={handleChange}
                  placeholder="e.g. Benin City, Edo State / London, UK"
                  className="nom-input"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step-content">
            <div className="step-section-heading">
              <FileText size={22} className="step-section-icon" />
              <div>
                <h3 className="step-section-title">Step 2: Key Achievements & Citation</h3>
                <p className="caption text-muted">Summarize the nominee's achievements and social impact.</p>
              </div>
            </div>

            <div className="nom-field">
              <label className="nom-label">
                Summary Citation <span className="required-star">*</span>
              </label>
              <p className="caption text-muted field-hint">
                Briefly summarize why this nominee deserves the Best of Edo Award (2-3 sentences).
              </p>
              <textarea
                name="citation"
                value={formData.citation}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the nominee's core achievement and impact..."
                className="nom-textarea"
                required
              />
            </div>

            <div className="nom-field">
              <label className="nom-label">
                Detailed Contributions & Evidence <span className="required-star">*</span>
              </label>
              <p className="caption text-muted field-hint">
                Provide specific examples of leadership, innovation, community impact, or service.
              </p>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows={5}
                placeholder="Highlight tangible milestones, projects, initiatives, or historical contributions..."
                className="nom-textarea"
                required
              />
            </div>

            <div className="nom-field">
              <label className="nom-label">Supporting Link / Portfolio URL (Optional)</label>
              <input
                type="url"
                name="supportingLink"
                value={formData.supportingLink}
                onChange={handleChange}
                placeholder="https://..."
                className="nom-input"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step-content">
            <div className="step-section-heading">
              <User size={22} className="step-section-icon" />
              <div>
                <h3 className="step-section-title">Step 3: Nominator Information</h3>
                <p className="caption text-muted">Enter your details as the nominator for verification.</p>
              </div>
            </div>

            <div className="nom-row">
              <div className="nom-field">
                <label className="nom-label">
                  Your Full Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  name="nominatorName"
                  value={formData.nominatorName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="nom-input"
                  required
                />
              </div>
              <div className="nom-field">
                <label className="nom-label">
                  Your Email Address <span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  name="nominatorEmail"
                  value={formData.nominatorEmail}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="nom-input"
                  required
                />
              </div>
            </div>

            <div className="nom-row">
              <div className="nom-field">
                <label className="nom-label">
                  Your Phone / WhatsApp <span className="required-star">*</span>
                </label>
                <input
                  type="tel"
                  name="nominatorPhone"
                  value={formData.nominatorPhone}
                  onChange={handleChange}
                  placeholder="+234..."
                  className="nom-input"
                  required
                />
              </div>
              <div className="nom-field">
                <label className="nom-label">Relationship to Nominee</label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="nom-select"
                >
                  <option value="Colleague / Professional">Colleague / Professional</option>
                  <option value="Community Member">Community Member</option>
                  <option value="Self-Nomination">Self-Nomination</option>
                  <option value="Friend / Family">Friend / Family</option>
                  <option value="Observer / Public">Observer / Public</option>
                </select>
              </div>
            </div>

            <div className="nom-summary-preview">
              <span className="label-caps gold-text">Submission Overview</span>
              <p className="body-sm">
                <strong>Nominee:</strong> {formData.nomineeName || 'N/A'} ({formData.category})
              </p>
              <p className="body-sm text-muted">
                <strong>Location:</strong> {formData.nomineeLocation || 'N/A'}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="form-actions-row">
          {step > 1 ? (
            <button type="button" onClick={handlePrev} className="btn btn-outline btn-step-prev">
              <ChevronLeft size={18} /> Previous Step
            </button>
          ) : (
            <div className="btn-spacer" />
          )}

          {step < 3 ? (
            <button type="submit" className="btn btn-primary btn-step-next">
              Next Step <ChevronRight size={18} />
            </button>
          ) : (
            <button type="submit" className="btn btn-gold btn-submit-nomination">
              <Send size={18} /> Submit Official Nomination
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
