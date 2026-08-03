import { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import NominateCta from '../components/NominateCta';
import './Gallery.css';

const YEARS = ['All Years', '2026', '2025', '2024'];
const CATEGORIES = ['Arts', 'Leadership', 'Innovation', 'Culture'];

function GalleryHero() {
  return (
    <header className="gallery-hero">
      <div className="edo-pattern" />
      <div className="container gallery-hero-inner">
        <h1 className="display-lg gallery-title">Gallery</h1>
        <p className="body-lg text-muted gallery-subtitle">
          Journey through the moments of excellence that define the Great Benin legacy.
          A curated collection of triumphs, culture, and innovation.
        </p>
      </div>
    </header>
  );
}

function GalleryFilter() {
  const [year, setYear] = useState('All Years');
  const [category, setCategory] = useState('Arts');

  return (
    <div className="gallery-filter">
      <div className="container gallery-filter-inner">
        <div className="gallery-filter-years">
          {YEARS.map((y) => (
            <button
              key={y}
              className={`filter-chip ${year === y ? 'active' : ''}`}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
        <div className="gallery-filter-divider" />
        <div className="gallery-filter-cats">
          <span className="gallery-filter-label">Categories:</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-cat ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ item }) {
  const isVideo = item.type === 'video';
  return (
    <article
      className={`gallery-card gallery-card-${item.span} ${isVideo ? 'is-video' : ''}`}
    >
      <div
        className="gallery-card-bg"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="gallery-card-shade" />

      {isVideo && (
        <div className="gallery-play">
          <span className="gallery-play-btn">
            <Play size={28} fill="currentColor" />
          </span>
        </div>
      )}

      <div className="gallery-card-caption">
        {item.tag && <span className="label-caps gallery-card-tag">{item.tag}</span>}
        <h3 className="gallery-card-title">{item.title}</h3>
        {item.meta && <p className="caption gallery-card-meta">{item.meta}</p>}
      </div>
    </article>
  );
}

export default function Gallery() {
  return (
    <>
      <GalleryHero />
      <GalleryFilter />
      <main className="container gallery-main">
        <div className="gallery-bento">
          {GALLERY_ITEMS.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        <div className="gallery-more">
          <button className="gallery-more-btn">
            View More Archives
            <ArrowRight size={16} />
          </button>
        </div>
      </main>

      <NominateCta
        eyebrow="The Spotlight Awaits"
        title="Nominate"
        titleGold="Excellence"
        copy="Do you know a trailblazer who embodies the spirit of the Great Benin legacy? Help us recognize their achievements."
        ctaText="Start Nomination"
      />
    </>
  );
}
