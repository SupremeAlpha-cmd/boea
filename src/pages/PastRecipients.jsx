import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, Filter, RefreshCw, Trophy, Users, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { RECIPIENTS } from '../data/site';
import { PAST_RECIPIENTS_DATA } from '../data/content';
import '../styles/pages.css';
import './PastRecipients.css';

export default function PastRecipients() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredRecipients = useMemo(() => {
    return PAST_RECIPIENTS_DATA.filter((item) => {
      return (
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.citation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
  };

  const getMonogram = (name) => {
    if (!name) return 'B';
    const clean = name.replace(/^(Prince|HRH|Dr\.|Barr\.|Hon\.|Amb\.|Mrs|Enogie)\s+/gi, '').trim();
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'B';
  };

  return (
    <main>
      <PageHero
        eyebrow={RECIPIENTS.eyebrow}
        title={RECIPIENTS.title}
        intro={RECIPIENTS.intro}
      />

      <section className="page-section section">
        <div className="container">
          {/* Archive Statistics Counter */}
          <div className="recipients-stats-grid">
            <div className="recipients-stat-card">
              <Trophy size={28} className="stat-icon" />
              <div className="stat-number">{PAST_RECIPIENTS_DATA.length}+</div>
              <div className="stat-label">Distinguished Laureates</div>
            </div>
            <div className="recipients-stat-card">
              <Award size={28} className="stat-icon" />
              <div className="stat-number">8</div>
              <div className="stat-label">Historic Editions</div>
            </div>
            <div className="recipients-stat-card">
              <Globe size={28} className="stat-icon" />
              <div className="stat-number">6+</div>
              <div className="stat-label">Spheres of Impact</div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="recipients-filter-bar">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search laureate by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="recipients-search-input"
                aria-label="Search recipients"
              />
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={resetFilters}
                className="btn btn-outline reset-filter-btn"
                aria-label="Reset filters"
              >
                <RefreshCw size={14} />
                Reset
              </button>
            )}
          </div>

          {/* Laureates Cards Grid */}
          {filteredRecipients.length > 0 ? (
            <div className="recipients-grid">
              {filteredRecipients.map((rec) => (
                <article key={rec.id} className="recipient-card">
                  {rec.image ? (
                    <div className="recipient-image-wrapper">
                      <img src={rec.image} alt={rec.name} className="recipient-image" />
                    </div>
                  ) : (
                    <div className="recipient-title-card-header">
                      <div className="title-card-monogram">
                        {getMonogram(rec.name)}
                      </div>
                    </div>
                  )}
                  <div className="recipient-card-body">
                    <h3 className="headline-md recipient-name">{rec.name}</h3>
                    <p className="body-md recipient-citation">{rec.citation}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="recipients-empty-state" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <Trophy size={48} className="empty-icon gold-text" style={{ margin: '0 auto 1rem' }} />
              <h3 className="headline-md">Official Laureates Archive Updating</h3>
              <p className="body-md text-muted" style={{ maxWidth: '580px', margin: '0 auto' }}>
                The official catalog of past award recipients across previous editions is currently undergoing institutional verification and cataloging for the 2026 season.
              </p>
              <Link to="/nomination" className="btn btn-gold margin-top-md" style={{ display: 'inline-flex' }}>
                Nominate a 2026 Laureate
              </Link>
            </div>
          )}

          {/* Institutional Legacy Note */}
          <div className="recipients-legacy-note margin-top-xl">
            <span className="label-caps eyebrow">Institutional Memory</span>
            <h3 className="headline-lg">Documenting Edo Excellence</h3>
            {RECIPIENTS.close.slice(0, 3).map((paragraph, index) => (
              <p key={index} className="body-lg text-muted legacy-paragraph">
                {paragraph}
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
        ctaText="Nominate a Laureate"
      />
    </main>
  );
}
