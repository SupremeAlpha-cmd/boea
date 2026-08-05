import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { CATEGORIES } from '../data/site';
import '../styles/pages.css';
import './AwardCategories.css';

export default function AwardCategories() {
  const standard = CATEGORIES.slice(0, 8);
  const special = CATEGORIES.slice(8);

  return (
    <main>
      <PageHero
        eyebrow="Award Categories"
        title="Celebrating Excellence Across Diverse Fields"
        intro="The Prestigious Best of Edo Award recognises exceptional individuals and organisations whose achievements, leadership, creativity, innovation and service contribute meaningfully to society, Edo State, Nigeria and the global community."
      />

      <section className="page-section section">
        <div className="container">
          <div className="card-grid cols-2">
            {standard.map((cat) => (
              <div key={cat.title} className="rich-card cat-card">
                <span className="rich-card-index">{cat.number}</span>
                <span className="label-caps cat-tag">{cat.tag}</span>
                <h3 className="headline-md rich-card-title">{cat.title}</h3>
                <p className="body-md rich-card-text">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-alt section">
        <div className="container">
          <div className="grid-header">
            <span className="label-caps grid-header-eyebrow">Special Recognition</span>
            <h2 className="headline-xl grid-header-title">
              Honouring Exceptional Service, Lifetimes & Legacies
            </h2>
          </div>
          <div className="card-grid cols-3">
            {special.map((cat) => (
              <div key={cat.title} className="rich-card cat-card">
                <span className="rich-card-index">{cat.number}</span>
                <h3 className="headline-md rich-card-title">{cat.title}</h3>
                <p className="body-md rich-card-text">{cat.description}</p>
              </div>
            ))}
          </div>

          <div className="cat-grid-closing">
            <p className="page-close-quote">
              Different Fields. Different Journeys. One Standard: Excellence.
            </p>
            <div className="page-close-actions">
              <Link to="/nomination" className="btn btn-primary">
                Nominate a Candidate
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/faq" className="btn btn-outline">
                Frequently Asked Questions
                <ArrowRight size={18} />
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
