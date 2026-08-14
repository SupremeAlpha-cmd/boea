import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Handshake, Building2, Globe, Calendar, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './PreviousPartners.css';

const PREVIOUS_PARTNERS_ARCHIVE = [
  {
    edition: '8th Edition (2025)',
    year: '2025',
    headline: '8th Edition Sponsors & Supporters',
    partners: [
      { id: 'p-801', name: 'Walkfront African Network', category: 'Headline Sponsor', logo: '/logo.png' },
      { id: 'p-802', name: 'Glo (Globacom)', category: 'Telecommunications Partner', logo: '/assets/glo_partner.jpeg' },
      { id: 'p-803', name: 'Mainseed', category: 'Corporate Partner', logo: '/assets/mainseed_partner.jpeg' },
      { id: 'p-804', name: 'Edo State Tourism Board', category: 'Official Partner', logo: '/logo.png' },
      { id: 'p-805', name: 'Benin Cultural Heritage Federation', category: 'Strategic Partner', logo: '/logo.png' }
    ]
  },
  {
    edition: '7th Edition (2024)',
    year: '2024',
    headline: '7th Edition Corporate & Cultural Partners',
    partners: [
      { id: 'p-701', name: 'Walkfront African Network', category: 'Headline Sponsor', logo: '/logo.png' },
      { id: 'p-702', name: 'Glo (Globacom)', category: 'Telecommunications Partner', logo: '/assets/glo_partner.jpeg' },
      { id: 'p-703', name: 'Edo Heritage Preservation Guild', category: 'Cultural Partner', logo: '/logo.png' },
      { id: 'p-704', name: 'Benin Royal Arts Council', category: 'Institutional Partner', logo: '/logo.png' }
    ]
  },
  {
    edition: '6th Edition (2023)',
    year: '2023',
    headline: '6th Edition Historic Benefactors',
    partners: [
      { id: 'p-601', name: 'Walkfront African Network', category: 'Headline Sponsor', logo: '/logo.png' },
      { id: 'p-602', name: 'West African Media Alliance', category: 'Official Media Partner', logo: '/logo.png' }
    ]
  }
];

export default function PreviousPartners() {
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredArchive =
    selectedYear === 'All'
      ? PREVIOUS_PARTNERS_ARCHIVE
      : PREVIOUS_PARTNERS_ARCHIVE.filter((item) => item.year === selectedYear);

  return (
    <main>
      <PageHero
        eyebrow="Partners & Sponsors Archive"
        title="Our Previous Partners & Benefactors"
        intro="We honor the corporate organizations, government institutions, and civic partners whose generosity and collaboration have sustained the Best of Edo Award platform through previous editions."
      />

      <section className="page-section section">
        <div className="container">
          {/* Header Stats */}
          <div className="prev-partners-stats-grid">
            <div className="prev-partner-stat-card">
              <Building2 size={28} className="stat-icon" />
              <div className="stat-number">25+</div>
              <div className="stat-label">Past Corporate Benefactors</div>
            </div>
            <div className="prev-partner-stat-card">
              <Calendar size={28} className="stat-icon" />
              <div className="stat-number">8</div>
              <div className="stat-label">Editions Supported</div>
            </div>
            <div className="prev-partner-stat-card">
              <Globe size={28} className="stat-icon" />
              <div className="stat-number">100%</div>
              <div className="stat-label">Civic & Cultural Dedication</div>
            </div>
          </div>

          {/* Filter Navigation */}
          <div className="prev-partners-filter-row">
            <span className="label-caps filter-label">Filter By Edition:</span>
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-pill ${selectedYear === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedYear('All')}
              >
                All Editions
              </button>
              {PREVIOUS_PARTNERS_ARCHIVE.map((group) => (
                <button
                  key={group.year}
                  type="button"
                  className={`filter-pill ${selectedYear === group.year ? 'active' : ''}`}
                  onClick={() => setSelectedYear(group.year)}
                >
                  {group.edition}
                </button>
              ))}
            </div>
          </div>

          {/* Edition Groupings */}
          <div className="prev-partners-editions-list">
            {filteredArchive.map((group) => (
              <div key={group.year} className="edition-partners-block">
                <div className="edition-block-header">
                  <span className="label-caps edition-badge">{group.edition}</span>
                  <h2 className="headline-lg edition-title">{group.headline}</h2>
                </div>

                <div className="previous-partners-grid">
                  {group.partners.map((partner) => (
                    <div key={partner.id} className="prev-partner-card">
                      <div className="prev-partner-logo-box">
                        <img src={partner.logo} alt={`${partner.name} logo`} className="prev-partner-logo" />
                      </div>
                      <div className="prev-partner-info">
                        <h3 className="prev-partner-name">{partner.name}</h3>
                        <span className="prev-partner-cat label-caps">{partner.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note on Upcoming List & Logo Updates */}
          <div className="prev-partners-note-box margin-top-xl">
            <Handshake size={36} className="note-icon" />
            <h3 className="headline-md">Historical Archive Update</h3>
            <p className="body-md text-muted">
              Complete historical lists, partner logos, and sponsorship details for earlier editions are currently being updated by the organizing committee and will be fully expanded here soon.
            </p>
            <div className="margin-top-md">
              <Link to="/partners" className="btn btn-outline">
                Become a Partner for 2026
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NominateCta
        eyebrow="Join Our Heritage Legacy"
        title="Partner With Us For The"
        titleGold="9th Edition 2026"
        copy="Align your brand with excellence, innovation, and Edo culture. Connect with our partnerships team today."
        ctaText="Express Sponsorship Interest"
        ctaTo="/partners"
      />
    </main>
  );
}
