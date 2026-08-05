import { Link } from 'react-router-dom';
import { ArrowUpRight, Archive } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { RECIPIENTS } from '../data/site';
import '../styles/pages.css';
import './PastRecipients.css';

export default function PastRecipients() {
  return (
    <main>
      <PageHero
        eyebrow={RECIPIENTS.eyebrow}
        title={RECIPIENTS.title}
        intro={RECIPIENTS.intro}
      />

      <section className="page-section section">
        <div className="container">
          <div className="recipients-archive">
            <Archive size={40} className="recipients-archive-icon" />
            <span className="label-caps">Recipients Archive</span>
            <h2 className="headline-xl">A Growing Record of Achievement</h2>
            <div className="recipients-bullets">
              {RECIPIENTS.bullets.map((b) => (
                <p key={b} className="body-lg text-muted">
                  {b}
                </p>
              ))}
            </div>
            <p className="body-md text-muted recipients-archive-note">
              Past recipients will be published here soon.
            </p>
            <div className="page-close-actions">
              <Link to="/edition-2026" className="btn btn-primary">
                9th Edition 2026
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/nomination" className="btn btn-outline">
                Nominate for 2026
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="page-close">
            {RECIPIENTS.close.map((c, i) => (
              <p key={i} className="body-md page-close-text">
                {c}
              </p>
            ))}
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
