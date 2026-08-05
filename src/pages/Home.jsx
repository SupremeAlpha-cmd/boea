import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { HERO_SLIDES } from '../data/content';
import { HOME } from '../data/site';
import NominateCta from '../components/NominateCta';
import './Home.css';

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="hero">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === current ? 'active' : ''}`}
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
              <Link to="/categories" className="btn btn-primary">
                Nominate A Laureate
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
        <div className="hero-arrows">
          <button className="hero-arrow" onClick={prev} aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>
          <button className="hero-arrow" onClick={next} aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="hero-indicators">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-indicator ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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

function SplitSection({ reverse, eyebrow, title, paragraphs, image, alt, cta, ctaTo }) {
  return (
    <section className="split section">
      <div className="container split-grid">
        <div className={`split-media ${reverse ? 'split-media-reverse' : ''}`}>
          <img src={image} alt={alt} />
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
        image="/assets/gala_red_carpet.png"
        alt="Best of Edo Award gala red carpet"
        cta="See Past Recipients"
        ctaTo="/recipients"
      />
      <SplitSection
        eyebrow={HOME.fromEdoToWorld.title}
        title={HOME.fromEdoToWorld.title}
        paragraphs={HOME.fromEdoToWorld.paragraphs}
        image="/assets/esan_culture.png"
        alt="Esan culture and heritage"
        cta="Discover Our Heritage"
        ctaTo="/heritage"
      />
      <PillarsSection />
      <ClosingSection />
      <NominateCta
        eyebrow="Your Voice Matters"
        title="Recognize the Greatness"
        titleGold="Within Your Community"
        copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
        ctaText="Nominate Someone Now"
        secondaryText="Download Guidelines"
      />
    </main>
  );
}
