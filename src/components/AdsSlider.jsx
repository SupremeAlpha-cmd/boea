import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdsSlider.css';

const AD_IMAGES = [
  { id: 1, src: '/assets/ads1.jpeg', alt: 'Sponsored Advert 1', link: '/partners' },
  { id: 2, src: '/assets/ads 2.jpeg', alt: 'Sponsored Advert 2', link: '/partners' }
];

export default function AdsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AD_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ads-slider-wrapper">
      <div className="ads-slider-container">
        {AD_IMAGES.map((ad, idx) => (
          <div
            key={ad.id}
            className={`ads-slide ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => navigate(ad.link)}
            role="button"
            tabIndex={0}
            aria-label={`Sponsored Advert ${idx + 1}`}
          >
            <img src={ad.src} alt={ad.alt} className="ads-slide-img" />
          </div>
        ))}
        <div className="ads-dots">
          {AD_IMAGES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`ads-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
