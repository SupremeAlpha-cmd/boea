import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import InterestForm from '../components/InterestForm';
import { PARTNERS } from '../data/site';
import '../components/ContentPage.css';
import '../styles/pages.css';

const FORM_OPTIONS = [
  'Corporate Sponsorship',
  'Strategic Partnership',
  'Media Partnership',
  'Institutional Partnership',
  'Humanitarian Support',
  'In-kind Support',
  'Other'
];

export default function Partners() {
  return (
    <main>
      <PageHero
        eyebrow={PARTNERS.eyebrow}
        title={PARTNERS.title}
        intro={PARTNERS.intro}
      />

      <section className="page-section section">
        <div className="container">
          <div className="grid-header">
            <span className="label-caps grid-header-eyebrow">Why Partner With Us?</span>
            <h2 className="headline-xl grid-header-title">A Platform Built for Impact</h2>
          </div>
          <div className="card-grid cols-2">
            {PARTNERS.benefits.map((b, i) => (
              <div key={b.title} className="rich-card">
                <span className="rich-card-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="headline-md rich-card-title">{b.title}</h3>
                <p className="body-md rich-card-text">{b.text}</p>
              </div>
            ))}
          </div>

          <div className="margin-top-xl" style={{ textAlign: 'center', background: 'var(--surface-container-low)', padding: '2.5rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--outline-variant)' }}>
            <span className="label-caps eyebrow" style={{ color: 'var(--secondary)' }}>Historic Collaborations</span>
            <h3 className="headline-lg" style={{ color: 'var(--primary)', margin: '0.5rem 0 1rem 0' }}>Previous Partners & Benefactors</h3>
            <p className="body-lg text-muted" style={{ maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
              Explore the corporate organizations, cultural institutions, and sponsors who have supported previous editions of the Best of Edo Award.
            </p>
            <Link to="/previous-partners" className="btn btn-outline">
              View Previous Partners Archive
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section-alt section">
        <div className="container">
          <div className="form-split">
            <div>
              <span className="label-caps grid-header-eyebrow">Partnership Opportunities</span>
              <h2 className="headline-xl">How You Can Partner With Us</h2>
              <div className="content-bullets" style={{ listStyle: 'none', padding: 0 }}>
                {PARTNERS.opportunities.map((op) => (
                  <li key={op}>{op}</li>
                ))}
              </div>
              {PARTNERS.close.map((c, i) => (
                <p key={i} className="body-lg text-muted">
                  {c}
                </p>
              ))}
            </div>
            <div>
              <h3 className="headline-lg">Express Interest</h3>
              <InterestForm
                title="Partner With the Award"
                subtitle="Tell us about your organisation and how you would like to partner — our team will be in touch."
                options={FORM_OPTIONS}
              />
            </div>
          </div>
        </div>
      </section>

      <NominateCta
        eyebrow="Your Voice Matters"
        title="Recognize the Greatness"
        titleGold="Within Your Community"
        copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
        ctaText="Nominate Someone Now"
      />
    </main>
  );
}
