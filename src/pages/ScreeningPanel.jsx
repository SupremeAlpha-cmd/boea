import { Award, ShieldCheck, CheckCircle2, FileText, UserCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './ScreeningPanel.css';

// Placeholder structure ready for when screening panel profiles/photos are provided
const SCREENING_PANEL_MEMBERS = [];

export default function ScreeningPanel() {
  return (
    <main>
      <PageHero
        eyebrow="Selection & Governance"
        title="BOEA Award Nominees Screening Panel"
        intro="An independent, merit-driven committee of respected experts, academicians, and leaders responsible for vetting, evaluating, and shortlisting nominations for the Best of Edo Award with utmost integrity."
      />

      <section className="page-section section">
        <div className="container">

          {/* Featured Screening Panel Banner */}
          <div className="screening-banner">
            <ShieldCheck size={44} className="screening-banner-icon" />
            <h2 className="screening-banner-title">BOEA AWARD NOMINEES SCREENING PANEL</h2>
            <p className="screening-banner-text body-lg">
              The screening panel operates independently to ensure that every nomination received across all 11 categories is subjected to thorough verification, objective assessment, and rigorous merit-based evaluation.
            </p>
          </div>

          {/* Screening Evaluation Framework Pillars */}
          <div className="screening-header">
            <span className="label-caps grid-header-eyebrow">Evaluation Framework</span>
            <h2 className="headline-xl">Our Vetting Principles</h2>
          </div>

          <div className="screening-pillars-grid">
            <div className="screening-pillar-card">
              <div className="screening-pillar-num">01</div>
              <h3 className="screening-pillar-title">Merit & Substance</h3>
              <p className="screening-pillar-desc">
                Evaluating candidate achievements based on verified accomplishments, creative output, and professional excellence rather than public popularity alone.
              </p>
            </div>
            <div className="screening-pillar-card">
              <div className="screening-pillar-num">02</div>
              <h3 className="screening-pillar-title">Verifiable Societal Impact</h3>
              <p className="screening-pillar-desc">
                Measuring tangible contributions to Edo State, local communities, industry growth, and human development across Nigeria and globally.
              </p>
            </div>
            <div className="screening-pillar-card">
              <div className="screening-pillar-num">03</div>
              <h3 className="screening-pillar-title">Integrity & Character</h3>
              <p className="screening-pillar-desc">
                Ensuring all selected laureates reflect high ethical standards, civic responsibility, and positive representation of Edo heritage.
              </p>
            </div>
          </div>

          {/* Screening Panel Members Section */}
          <div className="margin-top-xl">
            <div className="screening-header">
              <span className="label-caps grid-header-eyebrow">Committee Members</span>
              <h2 className="headline-xl">Meet the Screening Panel</h2>
            </div>

            {SCREENING_PANEL_MEMBERS.length > 0 ? (
              <div className="screening-grid">
                {SCREENING_PANEL_MEMBERS.map((member) => (
                  <article key={member.id} className="screening-card">
                    <div className="screening-img-wrap">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="screening-img" />
                      ) : (
                        <div className="screening-avatar-placeholder">
                          <span className="screening-avatar-initials">SP</span>
                        </div>
                      )}
                    </div>
                    <div className="screening-body">
                      <h3 className="screening-name">{member.name}</h3>
                      <span className="screening-role label-caps">{member.role}</span>
                      <p className="screening-bio body-md">{member.profile}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: 'var(--surface-container-low)',
                  border: '1px dashed var(--outline-variant)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  maxWidth: '720px',
                  margin: '0 auto'
                }}
              >
                <UserCheck size={40} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                <h3 className="headline-md" style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>
                  Panel Profiles Being Compiled
                </h3>
                <p className="body-md text-muted" style={{ lineHeight: '1.7', margin: 0 }}>
                  Names, photos, and detailed profiles of the BOEA Nominees Screening Panel members are currently being finalized. Once ready, the full roster will be displayed right here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <NominateCta
        eyebrow="Independent & Transparent"
        title="Submit a Deserving Nominee"
        titleGold="For 2026 Consideration"
        copy="Do you know an individual or organization making an exceptional impact? Submit your nomination today for evaluation by our screening panel."
        ctaText="Nominate Someone Now"
      />
    </main>
  );
}
