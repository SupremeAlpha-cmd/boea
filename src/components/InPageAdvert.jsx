import { useState, useEffect } from 'react';
import { Building2, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import './InPageAdvert.css';

export const STATESIDE_ADS = [
  {
    id: 'ad-stateside-1',
    sponsor: 'Stateside Microfinance Bank',
    title: 'Experience Premier Digital Banking & Business Growth Loans',
    text: 'At Stateside, we fuse your financial and lifestyle needs by redefining convenience through intelligent, flexible solutions. Fast, secure micro-loans & digital banking engineered for Edo entrepreneurs, artisans, and families.',
    image: '/assets/stateside_ad_1.jpeg',
    ctaText: 'Explore Banking Packages',
    link: 'https://statesidebank.com',
    highlights: ['Low Rate Enterprise Credits', 'High Yield Savings', 'Zero Collateral Loans']
  },
  {
    id: 'ad-stateside-2',
    sponsor: 'Stateside Microfinance Bank',
    title: 'Grow Your Enterprise Capital with Stateside Digital Vault',
    text: 'Tailored corporate banking packages designed to scale small and medium Edo enterprises with flexible terms, reliable returns, and seamless digital payment integrations.',
    image: '/assets/stateside_ad_2.jpeg',
    ctaText: 'Open Business Account Online',
    link: 'https://statesidebank.com',
    highlights: ['High Savings Interest', 'Instant Bank Transfers', 'Dedicated Account Managers']
  }
];

export default function InPageAdvert() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Periodically change Stateside advert visual every 5 seconds
    const interval = setInterval(() => {
      triggerNextAd();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const triggerNextAd = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % STATESIDE_ADS.length);
      setIsFading(false);
    }, 300);
  };

  const triggerPrevAd = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + STATESIDE_ADS.length) % STATESIDE_ADS.length);
      setIsFading(false);
    }, 300);
  };

  const currentAd = STATESIDE_ADS[currentIndex];

  return (
    <section className="in-page-ad-section">
      <div className="container">
        <div className="in-page-ad-card">
          {/* Left / Top Image Showcase Box */}
          <div className={`in-page-ad-image-box ${isFading ? 'fading' : ''}`}>
            <img
              src={currentAd.image}
              alt={currentAd.sponsor}
              className="in-page-ad-img"
            />
            <div className="in-page-ad-img-gradient" />
            
            {/* Image Slider Indicators */}
            <div className="in-page-ad-dots">
              {STATESIDE_ADS.map((ad, idx) => (
                <button
                  key={ad.id}
                  type="button"
                  className={`in-page-ad-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setIsFading(true);
                    setTimeout(() => {
                      setCurrentIndex(idx);
                      setIsFading(false);
                    }, 300);
                  }}
                  aria-label={`Go to visual ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right / Bottom Content Box */}
          <div className={`in-page-ad-content ${isFading ? 'fading' : ''}`}>
            <div className="in-page-ad-sponsor-label">
              <Building2 size={16} className="gold-text" />
              <span>{currentAd.sponsor}</span>
            </div>

            <h2 className="in-page-ad-title">
              {currentAd.title}
            </h2>

            <p className="in-page-ad-text">
              {currentAd.text}
            </p>

            <div className="in-page-ad-highlights">
              {currentAd.highlights.map((h, i) => (
                <span key={i} className="in-page-ad-chip">
                  <CheckCircle2 size={13} /> {h}
                </span>
              ))}
            </div>

            <div className="in-page-ad-actions">
              <a
                href={currentAd.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold in-page-ad-btn"
              >
                {currentAd.ctaText} <ArrowUpRight size={16} />
              </a>

              {/* Slider Prev / Next Controls */}
              <div className="in-page-ad-arrows">
                <button
                  type="button"
                  className="in-page-ad-arrow"
                  onClick={triggerPrevAd}
                  aria-label="Previous advertisement"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="in-page-ad-arrow"
                  onClick={triggerNextAd}
                  aria-label="Next advertisement"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
