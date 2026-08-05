import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { FAQS } from '../data/site';
import '../styles/pages.css';
import './Faq.css';

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <main>
      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        intro="Answers to the questions we are asked most often about the Best of Edo Award, nominations, selection, sponsorship, partnership and support."
      />

      <section className="page-section section">
        <div className="container">
          <div className="faq-list">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className="faq-chevron" />
                  </button>
                  {isOpen && <div className="faq-answer">{faq.a}</div>}
                </div>
              );
            })}
          </div>

          <div className="page-close">
            <p className="page-close-quote">Still Have Questions?</p>
            <p className="body-md page-close-text">
              We are always happy to hear from you.
            </p>
            <div className="page-close-actions">
              <Link to="/contact" className="btn btn-primary">
                Contact the BOEA Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
