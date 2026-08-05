import { CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominationForm from '../components/NominationForm';
import { NOMINATION } from '../data/site';
import '../styles/pages.css';
import './Nomination.css';

export default function Nomination() {
  return (
    <main>
      <PageHero
        eyebrow={NOMINATION.eyebrow}
        title={NOMINATION.title}
        intro={NOMINATION.intro}
      />

      <section className="page-section section">
        <div className="container">
          <div className="nomination-cols">
            <div className="nomination-col">
              <span className="label-caps grid-header-eyebrow">Who Can Be Nominated?</span>
              {NOMINATION.whoCanBeNominated.map((p, i) => (
                <p key={i} className="body-lg text-muted nomination-col-text">
                  {p}
                </p>
              ))}

              <span className="label-caps grid-header-eyebrow nomination-col-label">
                What Makes a Strong Nomination?
              </span>
              <ul className="nomination-checklist">
                {NOMINATION.strongNomination.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} className="nomination-check-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="nomination-col">
              <span className="label-caps grid-header-eyebrow">The Process</span>
              <div className="nomination-steps-col">
                {NOMINATION.steps.map((step) => (
                  <div key={step.number} className="nomination-step-row">
                    <div className="numbered-number">{step.number}</div>
                    <div>
                      <h3 className="numbered-title">{step.title}</h3>
                      <p className="body-md numbered-text">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="portal" className="margin-top-xl">
            <NominationForm />
          </div>
        </div>
      </section>
    </main>
  );
}

