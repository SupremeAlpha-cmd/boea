import { Calendar, Landmark, Globe, Award, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import { HISTORY } from '../data/site';
import '../styles/pages.css';
import './History.css';

const TIMELINE_ICONS = [Landmark, Calendar, Award, Globe, Sparkles];

export default function History() {
  return (
    <main>
      <PageHero
        eyebrow={HISTORY.eyebrow}
        title={HISTORY.title}
        intro={HISTORY.intro}
      />

      <section className="page-section section">
        <div className="container">
          <div className="history-timeline">
            {HISTORY.blocks.map((block, index) => {
              const Icon = TIMELINE_ICONS[index % TIMELINE_ICONS.length];
              return (
                <div key={index} className="timeline-node">
                  <div className="timeline-marker">
                    <div className="timeline-icon-circle">
                      <Icon size={20} className="timeline-icon" />
                    </div>
                    {index < HISTORY.blocks.length - 1 && <div className="timeline-connector" />}
                  </div>
                  <div className="timeline-content-card">
                    <span className="label-caps gold-text">Milestone {index + 1}</span>
                    <h3 className="headline-md timeline-title">{block.heading}</h3>
                    {block.paragraphs &&
                      block.paragraphs.map((p, j) => (
                        <p key={j} className="body-lg text-muted timeline-paragraph">
                          {p}
                        </p>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
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
