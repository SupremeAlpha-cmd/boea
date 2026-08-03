import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES, NOMINATION_STEPS } from '../data/content';
import './AwardCategories.css';

function CategoriesHero() {
  return (
    <section className="cat-hero section">
      <div className="edo-pattern" />
      <div className="container cat-hero-inner">
        <span className="label-caps cat-hero-eyebrow">Prestige & Excellence</span>
        <h1 className="display-lg cat-hero-title">
          Celebrating the Vanguard of Edo Heritage
        </h1>
        <p className="body-lg text-muted cat-hero-copy">
          The Best of Edo Awards honors exceptional individuals and organizations who
          embody the legendary resilience and creative brilliance of the Benin Empire
          in a modern world.
        </p>
        <div className="cat-hero-actions">
          <a href="#nominate" className="btn btn-primary">
            Start Nomination
          </a>
          <a href="#categories" className="btn btn-outline">
            View Categories
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoriesGrid() {
  return (
    <section className="cat-grid-section section" id="categories">
      <div className="container">
        <div className="cat-grid-header">
          <div>
            <h2 className="headline-xl cat-grid-title">Award Categories</h2>
            <p className="body-md text-muted">
              Our categories recognize excellence across the spectrum of cultural,
              social, and technological advancement.
            </p>
          </div>
          <div className="cat-grid-nav">
            <button className="cat-nav-btn" aria-label="Scroll left">
              <ChevronLeft size={20} />
            </button>
            <button className="cat-nav-btn" aria-label="Scroll right">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="cat-cards">
          {CATEGORIES.map((cat) => (
            <article key={cat.title} className="cat-card">
              <span className="label-caps cat-card-tag">{cat.tag}</span>
              <h3 className="headline-md cat-card-title">{cat.title}</h3>
              <p className="body-md text-muted cat-card-desc">{cat.description}</p>
              <Link to="/past-winners" className="cat-card-link">
                Learn More
                <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NominationSection() {
  return (
    <section className="nomination section" id="nominate">
      <div className="container">
        <div className="nomination-head">
          <span className="label-caps nomination-eyebrow">The Journey</span>
          <h2 className="headline-xl nomination-title">Nomination Process</h2>
          <p className="body-md text-muted nomination-intro">
            Transparency and meritocracy are the pillars of the Edo Awards. Follow our
            structured journey to nominate your candidate.
          </p>
        </div>

        <div className="nomination-steps">
          {NOMINATION_STEPS.map((step) => (
            <div key={step.number} className="nomination-step">
              <div className="nomination-step-number">{step.number}</div>
              <h4 className="nomination-step-title">{step.title}</h4>
              <p className="body-md text-muted">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="nomination-cta">
          <Link to="/past-winners" className="btn btn-primary">
            Begin Submission
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <h2 className="headline-xl">Stay Informed on the Journey</h2>
        <p className="body-lg newsletter-copy">
          Receive updates on nomination deadlines, finalist announcements, and
          exclusive gala night invitations.
        </p>
        <form className="newsletter-form-row" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" aria-label="Email address" />
          <button type="submit" className="btn btn-gold">
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}

export default function AwardCategories() {
  return (
    <main>
      <CategoriesHero />
      <CategoriesGrid />
      <NominationSection />
      <Newsletter />
    </main>
  );
}
