import { Mail, Phone, Instagram, Building2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import InterestForm from '../components/InterestForm';
import { CONTACT } from '../data/site';
import '../styles/pages.css';
import './Contact.css';

const FORM_OPTIONS = [
  'Nomination enquiry',
  'Sponsorship & partnership',
  'Media & publicity',
  'Humanitarian scheme support',
  'Event & reservation enquiry',
  'General enquiry'
];

export default function Contact() {
  return (
    <main>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Start a Conversation"
        intro={`We are always happy to hear from you. For questions about the Award, nominations, sponsorship, partnerships, the Humanitarian Empowerment Support Scheme or the ${CONTACT.event.edition}, reach the Best of Edo Award organising team through the official channels below.`}
      />

      <section className="page-section section">
        <div className="container">
          <div className="contact-cards">
            <a href={`mailto:${CONTACT.email}`} className="contact-card">
              <Mail size={26} className="contact-card-icon" />
              <span className="label-caps contact-card-label">Email Us</span>
              <span className="contact-card-value">{CONTACT.email}</span>
            </a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="contact-card">
              <Phone size={26} className="contact-card-icon" />
              <span className="label-caps contact-card-label">Call / WhatsApp</span>
              <span className="contact-card-value">{CONTACT.phone}</span>
            </a>
            <a
              href={`https://www.instagram.com/${CONTACT.instagram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <Instagram size={26} className="contact-card-icon" />
              <span className="label-caps contact-card-label">Instagram</span>
              <span className="contact-card-value">{CONTACT.instagram}</span>
            </a>
            <div className="contact-card">
              <Building2 size={26} className="contact-card-icon" />
              <span className="label-caps contact-card-label">Organised By</span>
              <span className="contact-card-value">{CONTACT.organizedBy}</span>
            </div>
          </div>

          <div className="form-split contact-split">
            <div>
              <span className="label-caps grid-header-eyebrow">Upcoming Edition</span>
              <h2 className="headline-xl">{CONTACT.event.edition}</h2>
              <p className="body-lg text-muted">{CONTACT.event.date}</p>
              <p className="body-lg text-muted">{CONTACT.event.location}</p>
            </div>
            <InterestForm
              title="Send Us a Message"
              subtitle="Fill in the form and our team will get back to you."
              options={FORM_OPTIONS}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
