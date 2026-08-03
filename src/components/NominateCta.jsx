import { Link } from 'react-router-dom';
import './NominateCta.css';

export default function NominateCta({
  eyebrow,
  title,
  titleGold,
  copy,
  ctaText,
  ctaTo = '/categories',
  secondaryText
}) {
  return (
    <section className="cta-band">
      <div className="cta-band-watermark">
        <img src="/logo.png" alt="" />
      </div>
      <div className="edo-pattern cta-band-pattern" />
      <div className="container cta-band-inner">
        <span className="label-caps cta-band-eyebrow">{eyebrow}</span>
        <h2 className="headline-xl cta-band-title">
          {title} <span className="gold">{titleGold}</span>
        </h2>
        <p className="body-lg cta-band-copy">{copy}</p>
        <div className="cta-band-actions">
          <Link to={ctaTo} className="btn btn-gold">
            {ctaText}
          </Link>
          {secondaryText && <a href="#" className="btn btn-outline">{secondaryText}</a>}
        </div>
      </div>
    </section>
  );
}
