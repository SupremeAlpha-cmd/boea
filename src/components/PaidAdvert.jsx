import { useState, useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Building } from 'lucide-react';
import './PaidAdvert.css';

export default function PaidAdvert() {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const ADS = [
    {
      id: 'ad-stateside-1',
      sponsor: 'Stateside Microfinance Bank',
      title: 'Experience Premier Banking & Business Loans',
      subtitle: 'Fast, secure micro-loans & digital banking engineered for Edo entrepreneurs, artisans & families.',
      badge: 'OFFICIAL PAID ADVERT',
      image: '/assets/ads 2.jpeg',
      cta: 'Explore Banking Packages',
      link: 'https://statesidebank.com'
    },
    {
      id: 'ad-stateside-2',
      sponsor: 'Stateside Digital Vault',
      title: 'Grow Your Enterprise Capital with Stateside',
      subtitle: 'Higher interest savings yield, low transaction fees & zero collateral micro-credits.',
      badge: 'SPONSORED BANNER',
      image: '/assets/ads1.jpeg',
      cta: 'Open Account Online',
      link: 'https://statesidebank.com'
    }
  ];

  useEffect(() => {
    // Show pop-up advert after 1.5 seconds delay on load
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem('boea-ad-dismissed');
      if (!isDismissed) {
        setVisible(true);
      } else {
        setMinimized(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setMinimized(true);
    sessionStorage.setItem('boea-ad-dismissed', 'true');
  };

  const currentAd = ADS[currentAdIndex];

  return (
    <>
      {/* Floating Pop-Up Paid Advert Banner */}
      {visible && (
        <div className="paid-advert-floating-card animate-slide-up" role="complementary" aria-label="Sponsored Advertisement">
          <div className="paid-advert-header">
            <div className="paid-advert-badge-group">
              <span className="paid-advert-badge">
                {currentAd.badge}
              </span>
              <span className="paid-advert-verified">
                <ShieldCheck size={12} /> Verified
              </span>
            </div>
            <button
              type="button"
              className="paid-advert-close-btn"
              onClick={handleDismiss}
              aria-label="Close advertisement"
              title="Close advert"
            >
              <X size={16} />
            </button>
          </div>

          <div className="paid-advert-content-body">
            <div className="paid-advert-img-container">
              <img src={currentAd.image} alt={currentAd.sponsor} className="paid-advert-img" />
              <div className="paid-advert-overlay" />
            </div>

            <div className="paid-advert-text-wrap">
              <div className="paid-advert-sponsor-tag">
                <Building size={14} className="gold-text" />
                <span>{currentAd.sponsor}</span>
              </div>
              <h4 className="paid-advert-title">{currentAd.title}</h4>
              <p className="paid-advert-subtitle">{currentAd.subtitle}</p>

              <div className="paid-advert-actions">
                <a
                  href={currentAd.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold paid-advert-cta-btn"
                  onClick={() => alert(`Redirecting to ${currentAd.sponsor} portal...`)}
                >
                  {currentAd.cta}
                  <ExternalLink size={13} />
                </a>

                {ADS.length > 1 && (
                  <button
                    type="button"
                    className="paid-advert-next-btn"
                    onClick={() => setCurrentAdIndex((prev) => (prev + 1) % ADS.length)}
                    title="Next advert"
                  >
                    Next Ad &rsaquo;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Floating Widget Pill */}
      {minimized && !visible && (
        <button
          type="button"
          className="paid-advert-minimized-pill"
          onClick={() => { setVisible(true); setMinimized(false); }}
          title="View Stateside Bank Advert"
        >
          <Building size={14} className="gold-text" />
          <span>Stateside Bank Ad</span>
          <span className="paid-advert-pill-badge">PAID AD</span>
        </button>
      )}
    </>
  );
}
