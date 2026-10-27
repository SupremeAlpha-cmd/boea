import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { cmsFetch, CMS_PATHS } from '../lib/cms';
import '../styles/pages.css';
import './SponsorsLogos.css';

const DEFAULT_SPONSORS = [
  { id: 'def-1', name: 'Walkfront African Network', category: 'Headline Sponsor', logo: '/logo.png' },
  { id: 'def-2', name: 'Glo (Globacom)', category: 'Official Telecommunications Partner', logo: '/assets/glo_partner.jpeg' },
  { id: 'def-3', name: 'Mainseed', category: 'Official Corporate Partner', logo: '/assets/mainseed_partner.jpeg' },
  { id: 'def-4', name: 'Edo State Tourism Board', category: 'Official Partner', logo: '/logo.png' },
  { id: 'def-5', name: 'Benin Cultural Heritage Federation', category: 'Strategic Partner', logo: '/logo.png' },
];

export default function SponsorsLogos() {
  const [sponsors, setSponsors] = useState(DEFAULT_SPONSORS);

  // Admin-published list from the CMS; bundled defaults until then.
  useEffect(() => {
    let cancelled = false;
    cmsFetch(CMS_PATHS.sponsors, DEFAULT_SPONSORS).then((list) => {
      if (!cancelled) setSponsors(Array.isArray(list) ? list : DEFAULT_SPONSORS);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="Sponsors & Partners"
        title="Our Benefactors & Supporters"
        intro="We are honored to collaborate with leading corporate brands, government institutions, and cultural organizations that make the Best of Edo Award possible."
      />

      <section className="page-section section">
        <div className="container">
          <div className="sponsors-header-bar" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <h2 className="headline-lg">Official Sponsor Showcase</h2>
          </div>

          <div className="sponsors-grid-layout">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="sponsor-display-card">
                <div className="sponsor-logo-box">
                  <img src={sponsor.logo} alt={`${sponsor.name} Logo`} className="sponsor-logo-img" />
                </div>
                <div className="sponsor-card-details">
                  <h3 className="sponsor-card-name">{sponsor.name}</h3>
                  <span className="sponsor-card-category label-caps">{sponsor.category}</span>
                </div>
              </div>
            ))}
          </div>

          {sponsors.length === 0 && (
            <div className="empty-sponsors">
              <p className="body-lg text-muted">No sponsor logos available at the moment.</p>
            </div>
          )}

          <div className="margin-top-xl" style={{ textAlign: 'center', background: 'var(--surface-container-low)', padding: '2.5rem 2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--outline-variant)' }}>
            <span className="label-caps eyebrow" style={{ color: 'var(--secondary)' }}>Historic Archive</span>
            <h3 className="headline-lg" style={{ color: 'var(--primary)', margin: '0.5rem 0 1rem 0' }}>Looking For Previous Partners & Sponsors?</h3>
            <p className="body-lg text-muted" style={{ maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
              View the historical record of benefactors and sponsors who supported the Best of Edo Award across previous editions.
            </p>
            <Link to="/previous-partners" className="btn btn-outline">
              Explore Previous Partners Archive
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <NominateCta
        eyebrow="Support Excellence"
        title="Become a Sponsor & Partner"
        titleGold="For the 9th Edition 2026"
        copy="Align your brand with integrity and cultural heritage. Get in touch with our partnerships desk today."
        ctaText="Express Sponsorship Interest"
      />
    </main>
  );
}

