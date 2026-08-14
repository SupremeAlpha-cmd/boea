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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Extract unique categories and years for dropdown filters
  const categories = useMemo(() => {
    const set = new Set(PAST_RECIPIENTS_DATA.map((r) => r.category));
    return ['All', ...Array.from(set)];
  }, []);

  const years = useMemo(() => {
    const set = new Set(PAST_RECIPIENTS_DATA.map((r) => r.year));
    return ['All', ...Array.from(set).sort().reverse()];
  }, []);

  // Filter logic
  const filteredRecipients = useMemo(() => {
    return PAST_RECIPIENTS_DATA.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesYear = selectedYear === 'All' || item.year === selectedYear;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedYear('All');
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
              <div className="stat-number">9+</div>
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
                placeholder="Search laureate by name, category, or citation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="recipients-search-input"
                aria-label="Search recipients"
              />
            </div>

            <div className="filter-selects">
              <div className="select-wrapper">
                <Filter size={16} className="select-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="recipients-select"
                  aria-label="Filter by Category"
                >
                  <option value="All">All Categories</option>
                  {categories.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="select-wrapper">
                <Award size={16} className="select-icon" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="recipients-select"
                  aria-label="Filter by Edition Year"
                >
                  <option value="All">All Editions</option>
                  {years.filter((y) => y !== 'All').map((year) => (
                    <option key={year} value={year}>
                      {year} Edition
                    </option>
                  ))}
                </select>
              </div>

              {(searchQuery || selectedCategory !== 'All' || selectedYear !== 'All') && (
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
          </div>

          {/* Laureates Cards Grid */}
          {filteredRecipients.length > 0 ? (
            <div className="recipients-grid">
              {filteredRecipients.map((rec) => (
                <article key={rec.id} className="recipient-card">
                  <div className="recipient-image-wrapper">
                    <img src={rec.image} alt={rec.name} className="recipient-image" />
                    <span className="laurel-badge recipient-badge">
                      <Award size={12} />
                      {rec.year} Laureate
                    </span>
                    <span className="edition-tag">{rec.edition}</span>
                  </div>
                  <div className="recipient-card-body">
                    <span className="label-caps recipient-category">{rec.category}</span>
                    <h3 className="headline-md recipient-name">{rec.name}</h3>
                    <p className="body-md recipient-citation">{rec.citation}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="recipients-empty-state">
              <Users size={48} className="empty-icon" />
              <h3 className="headline-md">No Laureates Found</h3>
              <p className="body-md text-muted">
                No recipients match your current search and filter criteria.
              </p>
              <button type="button" onClick={resetFilters} className="btn btn-primary margin-top-md">
                View All Laureates
              </button>
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
