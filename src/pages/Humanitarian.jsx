import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import InterestForm from '../components/InterestForm';
import { HUMANITARIAN } from '../data/site';
import '../components/ContentPage.css';
import '../styles/pages.css';

const FORM_OPTIONS = [
  'Individual donation',
  'Corporate contribution',
  'Sponsorship',
  'Strategic partnership',
  'In-kind support',
  'Other'
];

export default function Humanitarian() {
  return (
    <main>
      <PageHero
        eyebrow={HUMANITARIAN.eyebrow}
        title={HUMANITARIAN.title}
        intro={HUMANITARIAN.intro}
      />

      <section className="content-body section">
        <div className="container">
          <div className="content-prose">
            {HUMANITARIAN.blocks.map((block, i) => (
              <div key={i} className="content-block">
                {block.heading && <h2 className="headline-xl content-heading">{block.heading}</h2>}
                {block.intro && <p className="body-lg content-intro">{block.intro}</p>}
                {block.paragraphs &&
                  block.paragraphs.map((p, j) => (
                    <p key={j} className="body-lg content-paragraph">
                      {p}
                    </p>
                  ))}
                {block.bullets && (
                  <ul className="content-bullets">
                    {block.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section section">
        <div className="container">
          <div className="form-split">
            <div>
              <span className="label-caps grid-header-eyebrow">Join the Movement</span>
              <h2 className="headline-xl">Support the Scheme</h2>
              <p className="body-lg text-muted">
                Because while achievements deserve to be celebrated, people deserve to be
                supported. We celebrate excellence. We honour service. We extend compassion.
                We empower lives.
              </p>
              <div className="page-close-actions">
                <Link to="/partners" className="btn btn-primary">
                  Explore Partnership Opportunities
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="headline-lg">Express Interest</h3>
              <InterestForm
                title="Support the Humanitarian Scheme"
                subtitle="Let us know how you would like to contribute — our team will reach out."
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
