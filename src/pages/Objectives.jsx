import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { OBJECTIVES } from '../data/site';
import '../styles/pages.css';

export default function Objectives() {
  return (
    <main>
      <PageHero eyebrow={OBJECTIVES.eyebrow} title={OBJECTIVES.title} intro={OBJECTIVES.intro} />

      <section className="page-section section">
        <div className="container">
          <div className="numbered-list">
            {OBJECTIVES.items.map((item, i) => (
              <div key={item.title} className="numbered-item">
                <div className="numbered-number">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="numbered-title">{item.title}</h3>
                  <p className="body-md numbered-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="page-close">
            <p className="body-lg page-close-text">{OBJECTIVES.close}</p>
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
