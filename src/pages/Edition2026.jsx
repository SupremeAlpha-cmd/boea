import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { EDITION } from '../data/site';
import '../components/ContentPage.css';
import '../styles/pages.css';

export default function Edition2026() {
  return (
    <main>
      <PageHero
        eyebrow={EDITION.eyebrow}
        title={EDITION.title}
        intro={EDITION.intro}
      />

      <section className="content-body section">
        <div className="container">
          <div className="facts-strip">
            {EDITION.facts.map((fact) => (
              <div key={fact.label} className="fact-card">
                <span className="label-caps fact-label">{fact.label}</span>
                <span className="fact-value">{fact.value}</span>
              </div>
            ))}
          </div>

          <div className="content-prose">
            {EDITION.blocks.map((block, i) => (
              <div key={i} className="content-block">
                {block.heading && <h2 className="headline-xl content-heading">{block.heading}</h2>}
                {block.paragraphs &&
                  block.paragraphs.map((p, j) => (
                    <p key={j} className="body-lg content-paragraph">
                      {p}
                    </p>
                  ))}
              </div>
            ))}
          </div>

          <div className="page-close">
            <p className="page-close-quote">Save the Date — Mark Your Calendar.</p>
            <div className="page-close-actions">
              <Link to="/contact" className="btn btn-primary">
                Reserve Your Seat
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/nomination" className="btn btn-outline">
                Nominate a Candidate
                <ArrowUpRight size={18} />
              </Link>
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
