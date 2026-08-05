import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { PHILOSOPHY } from '../data/site';
import '../styles/pages.css';

export default function AwardPhilosophy() {
  return (
    <main>
      <PageHero eyebrow={PHILOSOPHY.eyebrow} title={PHILOSOPHY.title} intro={PHILOSOPHY.intro} />

      <section className="page-section section">
        <div className="container">
          <div className="card-grid cols-2">
            {PHILOSOPHY.principles.map((p, i) => (
              <div key={p.title} className="rich-card">
                <span className="rich-card-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="headline-md rich-card-title">{p.title}</h3>
                <p className="body-md rich-card-text">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="page-close">
            <p className="page-close-quote">{PHILOSOPHY.close}</p>
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
