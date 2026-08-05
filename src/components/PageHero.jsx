import './PageHero.css';

export default function PageHero({ eyebrow, title, intro }) {
  return (
    <header className="page-hero section">
      <div className="edo-pattern" />
      <div className="container page-hero-inner">
        {eyebrow && <span className="label-caps page-hero-eyebrow">{eyebrow}</span>}
        <h1 className="display-lg page-hero-title">{title}</h1>
        {intro && <p className="body-lg text-muted page-hero-intro">{intro}</p>}
      </div>
    </header>
  );
}
