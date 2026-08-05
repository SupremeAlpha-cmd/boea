import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { FOUNDER } from '../data/site';
import '../components/ContentPage.css';
import '../styles/pages.css';
import './Founder.css';

export default function Founder() {
  return (
    <main>
      <PageHero
        eyebrow={FOUNDER.eyebrow}
        title={FOUNDER.title}
        intro={FOUNDER.intro}
      />

      <section className="page-section section">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-portrait">
              <div className="founder-portrait-ring">
                <img
                  src="/assets/mr_paul.jpeg"
                  alt={`Portrait of ${FOUNDER.name}`}
                  className="founder-portrait-img"
                />
              </div>
              <span className="label-caps founder-portrait-caption">
                {FOUNDER.role}
              </span>
            </div>

            <div className="content-prose">
              {FOUNDER.blocks.map((block, i) => (
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
          </div>

          <div className="page-close">
            <p className="page-close-quote">“{FOUNDER.quote}”</p>
            <p className="body-md page-close-text">— {FOUNDER.name}</p>
            <div className="page-close-actions">
              <Link to="/humanitarian" className="btn btn-primary">
                Explore the Humanitarian Scheme
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                About the Award
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
