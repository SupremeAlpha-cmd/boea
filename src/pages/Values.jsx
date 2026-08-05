import { Award, Shield, Zap, Heart, Compass, Lightbulb, Landmark, Flame, Users, BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { VALUES } from '../data/site';
import '../styles/pages.css';
import './Values.css';

const VALUE_ICONS = [
  Award,
  Shield,
  Zap,
  Heart,
  Compass,
  Lightbulb,
  Landmark,
  Flame,
  Users,
  BookOpen
];

export default function Values() {
  return (
    <main>
      <PageHero
        eyebrow={VALUES.eyebrow}
        title={VALUES.title}
        intro={VALUES.intro}
      />

      <section className="page-section section">
        <div className="container">
          <div className="values-grid">
            {VALUES.items.map((item, index) => {
              const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
              return (
                <div key={item.title} className="value-card">
                  <div className="value-icon-badge">
                    <Icon size={24} className="value-icon" />
                  </div>
                  <h3 className="headline-sm value-title">{item.title}</h3>
                  <p className="body-md text-muted value-text">{item.text}</p>
                </div>
              );
            })}
          </div>

          {VALUES.summary && (
            <div className="values-summary-card margin-top-xl">
              <span className="label-caps gold-text">Our Core Principles</span>
              <div className="values-summary-pillars">
                {VALUES.summary.map((pillar, i) => (
                  <div key={i} className="summary-pillar-item">
                    <span className="pillar-dot" />
                    <span className="body-lg bold-text">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <NominateCta
        eyebrow="Your Voice Matters"
        title="Recognize the Greatness"
        titleGold="Within Your Community"
        copy="Nominations for the 2026 season are now officially open. Help us identify the trailblazers who are making Edo proud."
        ctaText="Nominate Someone Now"
      />
    </main>
  );
}
