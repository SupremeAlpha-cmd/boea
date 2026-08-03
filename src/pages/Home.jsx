import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { HERO_SLIDES, NEWS_ITEMS } from '../data/content';
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

function AboutSection() {
  return (
    <section className="about section" id="about">
      <div className="edo-pattern" />
      <div className="container about-centered">
        <div className="about-logo">
          <img src="/logo.png" alt="The Best of Edo Award logo" />
        </div>
        <span className="label-caps eyebrow">Prestige & Heritage</span>
        <h2 className="headline-xl about-title">
          A Celebration of Edo&rsquo;s Finest Minds
        </h2>
        <p className="body-lg text-muted">
          The Best of Edo Awards is more than a ceremony; it is a testament to the
          enduring spirit of excellence that has defined our kingdom for centuries.
          From the historic brass casters to modern-day visionaries, we honor those
          who push boundaries.
        </p>
        <p className="body-md text-muted about-second">
          Our platform serves as a bridge between the historical royal regalia of the
          Edo people and the contemporary sophistication of global excellence. We
          recognize the pioneers, the creators, and the leaders who embody the heart
          of Edo.
        </p>
        <Link to="/categories" className="action-link">
          Read Our Story
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function NewsSection() {
  const featured = NEWS_ITEMS[0];

  return (
    <section className="news section">
      <div className="container">
        <div className="news-header">
          <div>
            <span className="label-caps eyebrow">Discover</span>
            <h2 className="headline-xl">Latest News</h2>
          </div>
          <Link to="/gallery" className="news-view-all">
            View All Press
          </Link>
        </div>

        <Link to="/gallery" className="news-featured news-featured-horizontal">
          <div className="news-featured-image">
            <img src={featured.image} alt={featured.title} />
          </div>
          <div className="news-featured-body">
            <div className="news-featured-meta">
              <span className="news-tag">
                <Calendar size={14} />
                {featured.tag}
              </span>
              <span className="caption text-muted">{featured.date}</span>
            </div>
            <h3 className="headline-md news-featured-title">{featured.title}</h3>
            <p className="body-md text-muted">{featured.excerpt}</p>
            <span className="action-link news-featured-link">
              Read More
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function NominateBanner() {
  return (
    <NominateCta
      eyebrow="Your Voice Matters"
      title="Recognize the Greatness"
      titleGold="Within Your Community"
      copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
      ctaText="Nominate Someone Now"
      secondaryText="Download Guidelines"
    />
  );
}

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <AboutSection />
      <NewsSection />
      <NominateBanner />
    </main>
  );
}
