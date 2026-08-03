import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './PastWinners.css';

function WinnersHero() {
  return (
    <section className="winner-hero section">
      <div className="edo-pattern" />
      <div className="container winner-hero-inner">
        <h1 className="display-lg winner-title">Legacy of Excellence</h1>
        <p className="body-lg text-muted winner-subtitle">
          Celebrating our past winners who have set the gold standard for Edo heritage
          and innovation.
        </p>
      </div>
    </section>
  );
}

function WinnersGrid() {
  return (
    <section className="winners section">
      <div className="container">
        <div className="winner-cards">
          {WINNERS.map((winner) => (
            <article key={winner.name} className="winner-card">
              <div className="winner-card-image">
                <div className="winner-card-tint" />
                <img src={winner.image} alt={winner.name} />
                <span className="laurel-badge winner-laurel">
                  <Award size={12} />
                  {winner.year} Laureate
                </span>
              </div>
              <div className="winner-card-body">
                <span className="label-caps winner-category">{winner.category}</span>
                <h3 className="headline-md winner-name">{winner.name}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="winners-cta">
          <Link to="/categories" className="btn btn-primary">
            Nominate the Next Legend
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PastWinners() {
  return (
    <main>
      <WinnersHero />
      <WinnersGrid />
    </main>
  );
}
