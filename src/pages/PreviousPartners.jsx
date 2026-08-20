import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Building2, Radio, Newspaper, Share2, ExternalLink, Handshake, Calendar, Globe, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import RichLinkPreview from '../components/RichLinkPreview';
import { FEATURED_PRESS_LINKS } from '../data/content';
import '../styles/pages.css';
import './PreviousPartners.css';

const CATEGORIZED_PARTNERS = [
  {
    key: 'palace',
    category: 'Palace Brand Endorsement',
    icon: Crown,
    badgeColor: '#C9A227',
    description: 'Distinguished Royal Endorsement from the Palace of the Oba of Benin',
    partners: [
      {
        id: 'pal-1',
        name: 'The Royal Palace of Benin',
        tagline: 'Brand Endorsement & Royal Blessing',
        logo: '/assets/palace_logo_partner.jpeg',
        website: 'https://royalhouseofbenin.org'
      }
    ]
  },
  {
    key: 'corporate',
    category: 'Corporate / Brands / Organizations',
    icon: Building2,
    badgeColor: '#10B981',
    description: 'Corporate organizations and enterprises championing excellence & development',
    partners: [
      { id: 'corp-1', name: 'Walkfront African Network', tagline: 'Headline Convener & Sponsor', logo: '/logo.png' },
      { id: 'corp-2', name: 'Glo (Globacom)', tagline: 'Telecommunications Partner', logo: '/assets/glo_partner.jpeg' },
      { id: 'corp-3', name: 'Mainseed Corporate', tagline: 'Enterprise & Financial Partner', logo: '/assets/mainseed_partner.jpeg' },
      { id: 'corp-4', name: 'TapTap Send', tagline: 'Global Payments & Remittance Partner', logo: '/assets/taptap_send_partner.jpeg' },
      { id: 'corp-5', name: 'ESIPO (Edo State Investment Promotion Office)', tagline: 'Government Enterprise Agency', logo: '/assets/esipo_partner.jpeg' },
      { id: 'corp-6', name: 'Cornerstone Christian University', tagline: 'Academic & Higher Education Partner', logo: '/assets/cornerstone_christian_university_partner.jpeg' },
      { id: 'corp-7', name: 'Osazuwa Omede & Associates', tagline: 'Professional & Strategic Partner', logo: '/assets/osazuwa_omede_partner.jpeg' }
    ]
  },
  {
    key: 'radiotv',
    category: 'Radio / TV Brands',
    icon: Radio,
    badgeColor: '#3B82F6',
    description: 'Leading broadcast radio & television stations amplifying our voice across West Africa',
    partners: [
      { id: 'media-1', name: 'Vibes FM 97.3 Benin', tagline: 'Official Radio Broadcast Partner', logo: '/assets/vibes_fm_partner.jpeg' },
      { id: 'media-2', name: 'Speed FM 96.9 Benin', tagline: 'Youth & Urban Broadcast Partner', logo: '/assets/speed_fm_partner.jpeg' },
      { id: 'media-3', name: 'Iku FM', tagline: 'Cultural Broadcast Network', logo: '/assets/iku_fm_partner.jpeg' }
    ]
  },
  {
    key: 'newspaper',
    category: 'International | National | Local Newspaper Brands',
    icon: Newspaper,
    badgeColor: '#EC4899',
    description: 'Print journalism & news press documenting historic editions of the Award',
    partners: [
      { id: 'news-1', name: 'The Benin Blogger', tagline: 'Digital News & Press Publication', logo: '/assets/the_benin_blogger_partner.jpeg' },
      { id: 'news-2', name: 'Edo Pride Media', tagline: 'Heritage & National Press Feature', logo: '/assets/edo_pride_partner.jpeg' },
      { id: 'news-3', name: 'Da Kulture Empire Press', tagline: 'Arts & Cultural Feature Outlet', logo: '/assets/da_kulture_empire_partner.jpeg' }
    ]
  },
  {
    key: 'socialmedia',
    category: 'Social Media Brands & Digital Outlets',
    icon: Share2,
    badgeColor: '#8B5CF6',
    description: 'Online media hubs and digital creators extending global visibility',
    partners: [
      { id: 'soc-1', name: 'Edo Pride Global Network', tagline: 'Social Media Amplification Partner', logo: '/assets/edo_pride_partner.jpeg' },
      { id: 'soc-2', name: 'Walkfront Digital Media', tagline: 'Official Social Coverage Unit', logo: '/logo.png' }
    ]
  }
];

const NEWSPAPER_FEATURES = [
  {
    id: 'np-1',
    title: 'The Guardian — Best of Edo Award Honors Cultural Pioneers in Historic Edition',
    date: 'August 2024',
    source: 'The Guardian Newspaper',
    snippet: 'The 7th Edition of the Prestigious Best of Edo Award brought together leaders, royal delegates, and international dignitaries in Benin City...',
    image: '/assets/boea_6th_edition_poster.jpeg',
    link: '#'
  },
  {
    id: 'np-2',
    title: 'Vanguard News — Walkfront African Network Unveils 2026 BOEA Vision',
    date: 'November 2024',
    source: 'Vanguard Daily',
    snippet: 'Convener Paul Ofoni highlighted the growing international reach of Edo heritage and the launch of the Humanitarian Empowerment Support Scheme...',
    image: '/assets/boea_photo_wall.jpeg',
    link: '#'
  },
  {
    id: 'np-3',
    title: 'The Observer — Benin Palace Endorses Best of Edo Award Platform',
    date: 'December 2024',
    source: 'Edo Observer',
    snippet: 'Royal endorsement reinforces commitment to preservation of Great Benin historical traditions, youth empowerment, and excellence...',
    image: '/assets/boea_5th_edition_backdrop.jpeg',
    link: '#'
  }
];

export default function PreviousPartners() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCategories =
    selectedCategory === 'All'
      ? CATEGORIZED_PARTNERS
      : CATEGORIZED_PARTNERS.filter((cat) => cat.key === selectedCategory);

  return (
    <main>
      <PageHero
        eyebrow="Partners & Sponsorship Archive"
        title="Our Previous Partners & Benefactors"
        intro="We honor the corporate organizations, royal institutions, broadcast networks, and press outlets whose collaboration has sustained the Best of Edo Award platform."
      />

      <section className="page-section section">
        <div className="container">
          {/* Header Stats */}
          <div className="prev-partners-stats-grid">
            <div className="prev-partner-stat-card">
              <Building2 size={28} className="stat-icon" />
              <div className="stat-number">25+</div>
              <div className="stat-label">Corporate Benefactors</div>
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

          {/* Filter Navigation by Class */}
          <div className="prev-partners-filter-row">
            <span className="label-caps filter-label">Filter By Category:</span>
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-pill ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
              >
                All Categories
              </button>
              {CATEGORIZED_PARTNERS.map((group) => (
                <button
                  key={group.key}
                  type="button"
                  className={`filter-pill ${selectedCategory === group.key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(group.key)}
                >
                  {group.category.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Categorized Partner Blocks */}
          <div className="prev-partners-editions-list">
            {filteredCategories.map((group) => {
              const IconComp = group.icon;
              return (
                <div key={group.key} className="edition-partners-block">
                  <div className="edition-block-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <IconComp size={20} style={{ color: group.badgeColor }} />
                        <span className="label-caps edition-badge" style={{ color: group.badgeColor }}>
                          {group.category}
                        </span>
                      </div>
                      <h2 className="headline-lg edition-title" style={{ margin: 0 }}>
                        {group.category}
                      </h2>
                      <p className="body-sm text-muted" style={{ marginTop: '0.25rem' }}>
                        {group.description}
                      </p>
                    </div>
                    <span className="label-caps text-muted" style={{ fontSize: '11px', background: 'var(--surface-container-low)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--outline-variant)' }}>
                      {group.partners.length} {group.partners.length === 1 ? 'Partner' : 'Partners'}
                    </span>
                  </div>

                  <div className="previous-partners-grid">
                    {group.partners.map((partner) => (
                      <div key={partner.id} className="prev-partner-card">
                        <div className="prev-partner-logo-box">
                          <img src={partner.logo} alt={`${partner.name} logo`} className="prev-partner-logo" />
                        </div>
                        <div className="prev-partner-info">
                          <h3 className="prev-partner-name">{partner.name}</h3>
                          <span className="prev-partner-cat label-caps">{partner.tagline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Newspaper Front Page & Press Feature Highlights Section */}
          <div className="margin-top-xl" style={{ background: 'var(--surface-bright)', border: '1px solid var(--border-bronze-subtle)', borderRadius: 'var(--radius-xl)', padding: '2.5rem 2rem', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Newspaper size={24} className="gold-text" />
              <span className="label-caps gold-text">Featured Press Coverage</span>
            </div>
            <h2 className="headline-lg" style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
              Newspaper Front Pages & Areas We Have Been Featured
            </h2>
            <p className="body-md text-muted" style={{ maxWidth: '720px', marginBottom: '2rem' }}>
              Explore major newspaper front pages and editorial features showcasing the impact of the Best of Edo Award across national and international press.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {FEATURED_PRESS_LINKS.map((item) => (
                <RichLinkPreview key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Historical Archive Note */}
          <div className="prev-partners-note-box margin-top-xl">
            <Handshake size={36} className="note-icon" />
            <h3 className="headline-md">Historical Archive Update</h3>
            <p className="body-md text-muted">
              All previous partners and sponsors are categorized under their respective brand classes. New press feature links and front page scans continue to be added as archived media is digitized.
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

