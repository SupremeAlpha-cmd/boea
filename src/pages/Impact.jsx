import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { IMPACT } from '../data/site';
import '../styles/pages.css';

export default function Impact() {
  return (
    <main>
      <PageHero eyebrow={IMPACT.eyebrow} title={IMPACT.title} intro={IMPACT.intro} />

      <section className="page-section section">
        <div className="container">
          <div className="card-grid cols-2">
            {IMPACT.areas.map((area, i) => (
              <div key={area.title} className="rich-card">
                <span className="rich-card-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="headline-md rich-card-title">{area.title}</h3>
                <p className="body-md rich-card-text">{area.text}</p>
              </div>
            ))}
          </div>

          <div className="page-close">
            <p className="page-close-quote">
              An award can create visibility. Visibility can create opportunity. Opportunity
              can create greater impact.
            </p>
            {IMPACT.close.map((c, i) => (
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
