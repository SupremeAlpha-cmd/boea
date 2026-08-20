import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause
} from 'lucide-react';
import { HERO_SLIDES } from '../data/content';
import { HOME } from '../data/site';
import NominateCta from '../components/NominateCta';
import InPageAdvert from '../components/InPageAdvert';
import './Home.css';

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isPlaying || isHovered || isFocused || prefersReducedMotion) {
      return;
    }
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, isFocused]);

  const next = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prev();
    } else if (e.key === 'ArrowRight') {
      next();
    }
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      tabIndex={0}
      aria-label="Hero Carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? 'active' : ''}`}
          aria-hidden={index !== current}
        >
          <div
            className="hero-slide-bg"
            style={{ backgroundImage: `url("${slide.image}")` }}
          />
          <div className="hero-slide-overlay" />
          <div className="hero-slide-content container">
            <span className="hero-eyebrow">{slide.eyebrow}</span>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <div className="hero-cta">
              <Link to="/nomination" className="btn btn-primary">
                Nominate a Laureate
              </Link>
              <Link to="/gallery" className="hero-outline-link">
                View Media Gallery
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="hero-controls container">
        <div className="hero-controls-bar">
          <div className="hero-arrows">
            <button
              type="button"
              className="hero-arrow"
              onClick={prev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              className="hero-arrow"
              onClick={next}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="hero-indicators" role="tablist" aria-label="Slide Selection">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={`hero-indicator ${index === current ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1} of ${HERO_SLIDES.length}`}
                aria-selected={index === current}
                aria-current={index === current ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="about section" id="about">
      <div className="edo-pattern" />
      <div className="container about-centered">
        <div className="about-logo">
          <img src="/logo.png" alt="The Prestigious Best of Edo Award logo" />
        </div>
        <span className="label-caps eyebrow">{HOME.tagline}</span>
        <h2 className="headline-xl about-title">{HOME.slogan}</h2>
        {HOME.intro.map((p, i) => (
          <p key={i} className="body-lg text-muted about-paragraph">
            {p}
          </p>
        ))}
        <Link to="/about" className="action-link">
          About the Award
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function SplitSection({ reverse, eyebrow, title, paragraphs, image, images, alt, cta, ctaTo }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <section className="split section">
      <div className="container split-grid">
        <div className={`split-media ${reverse ? 'split-media-reverse' : ''}`}>
          {images && images.length > 1 ? (
            <div className="split-slideshow">
              {images.map((imgSrc, index) => (
                <img
                  key={imgSrc}
                  src={imgSrc}
                  alt={`${alt} slide ${index + 1}`}
                  className={index === currentIdx ? 'active' : ''}
                />
              ))}
              <div className="split-slideshow-indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`split-slideshow-dot ${index === currentIdx ? 'active' : ''}`}
                    onClick={() => setCurrentIdx(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <img src={image} alt={alt} />
          )}
        </div>
        <div className="split-content">
          <span className="label-caps split-eyebrow">{eyebrow}</span>
          <h2 className="headline-xl split-title">{title}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="body-lg text-muted split-paragraph">
              {p}
            </p>
          ))}
          {cta && (
            <Link to={ctaTo} className="btn btn-outline split-cta">
              {cta}
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="pillars section">
      <div className="container">
        <div className="pillars-head">
          <span className="label-caps pillars-eyebrow">Our Message</span>
          <h2 className="headline-xl pillars-title">{HOME.fromEdoToWorld.title}</h2>
        </div>
        <div className="pillars-grid">
          {HOME.fromEdoToWorld.pillars.map((pillar, i) => (
            <div key={i} className="pillar-card">
              <span className="pillar-number">0{i + 1}</span>
              <p className="pillar-text">{pillar}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="closing section">
      <div className="edo-pattern" />
      <div className="container closing-inner">
        <span className="label-caps closing-eyebrow">
          {HOME.recognising.title}
        </span>
        {HOME.recognising.paragraphs.map((p, i) => (
          <p key={i} className="body-lg closing-paragraph">
            {p}
          </p>
        ))}
        <div className="closing-actions">
          <Link to="/recipients" className="btn btn-primary">
            Explore Past Recipients
          </Link>
          <Link to="/edition-2026" className="btn btn-outline">
            The 9th Edition 2026
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <IntroSection />
      <SplitSection
        reverse
        eyebrow={HOME.moreThanAnAward.title}
        title={HOME.moreThanAnAward.title}
        paragraphs={HOME.moreThanAnAward.paragraphs}
        images={[
          '/assets/boea_photo_wall.jpeg',
          '/assets/boea_red_carpet_backdrop.jpeg',
          '/assets/boea_5th_edition_backdrop.jpeg',
          '/assets/boea_6th_edition_poster.jpeg',
          '/assets/coral_beads.jpeg'
        ]}
        alt="Best of Edo Award gala red carpet"
        cta="See Past Recipients"
        ctaTo="/recipients"
      />
      <SplitSection
        eyebrow={HOME.fromEdoToWorld.title}
        title={HOME.fromEdoToWorld.title}
        paragraphs={HOME.fromEdoToWorld.paragraphs}
        images={[
          '/assets/ososo_hills.png',
          '/assets/coral_beads.jpeg',
          '/assets/boea_6th_edition_poster.jpeg'
        ]}
        alt="Edo State landscape and heritage"
        cta="Discover Our Heritage"
        ctaTo="/heritage"
      />
      <PillarsSection />
      <ClosingSection />
      <InPageAdvert />
      <NominateCta
        eyebrow="Your Voice Matters"
        title="Recognize the Greatness"
        titleGold="Within Your Community"
        copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
        ctaText="Nominate a Laureate"
        secondaryText="Download Guidelines"
      />
    </main>
  );
}
