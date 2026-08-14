import { useState } from 'react';
import { Play, Camera, Film, X, Sparkles, ZoomIn } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './Gallery.css';

const PHOTOS = [
  { id: 1, span: 'wide', tag: 'Official Backdrop', title: 'Best of Edo Awards 5th Edition Backdrop', meta: 'Official BOEA Stage & Photo Wall', image: '/assets/boea_5th_edition_backdrop.jpeg' },
  { id: 2, span: 'normal', tag: 'Award Poster', title: 'BOEA 6th Edition — Official Award Poster', meta: 'Strictly Entertainment Edition Showcase', image: '/assets/boea_6th_edition_poster.jpeg' },
  { id: 3, span: 'normal', tag: 'Cultural Heritage', title: 'Coral Bead Regalia & Edo Heritage', meta: 'Great Benin Cultural Symbols & Regalia', image: '/assets/coral_beads.jpeg' },
  { id: 4, span: 'wide', tag: 'Red Carpet', title: 'BOEA Official Red Carpet Backdrop', meta: 'Best of Edo Awards Ceremonial Wall', image: '/assets/boea_red_carpet_backdrop.jpeg' },
  { id: 5, span: 'normal', tag: 'Trophy Emblem', title: 'The Great Benin Award Trophy', meta: 'Symbol of Excellence, Leadership & Distinction', image: '/assets/boea_6th_edition_poster.jpeg' },
  { id: 6, span: 'normal', tag: 'Cultural Textiles', title: 'Esan Weaving & Heritage Motifs', meta: 'Esanland Cultural Heritage Preservation', image: '/assets/esan_culture.png' },
  { id: 7, span: 'normal', tag: 'Highland Landscape', title: 'Ososo Hills — Edo North Highland Majesty', meta: 'Natural Heritage of Edo State', image: '/assets/ososo_hills.png' },
  { id: 8, span: 'normal', tag: 'Media Wall', title: 'BOEA Official Media & Photo Wall', meta: 'Best of Edo Awards Official Press Wall', image: '/assets/boea_photo_wall.jpeg' },
];

const VIDEOS = [
  { id: 'vid-1', title: 'BOEA Gala Night — Official Highlights', meta: 'Best of Edo Award — Event Coverage', duration: '1:00', tag: 'Gala Night', thumb: '/assets/boea_red_carpet_backdrop.jpeg', src: '/assets/boea_video_1.mp4' },
  { id: 'vid-2', title: 'BOEA Award Night — Stage Moments', meta: 'Best of Edo Award — Ceremony Coverage', duration: '0:36', tag: 'Ceremony', thumb: '/assets/boea_5th_edition_backdrop.jpeg', src: '/assets/boea_video_2.mp4' },
  { id: 'vid-3', title: 'BOEA Event Highlights — Atmosphere', meta: 'Best of Edo Award — Event Atmosphere', duration: '0:35', tag: 'Highlights', thumb: '/assets/boea_photo_wall.jpeg', src: '/assets/boea_video_3.mp4' },
  { id: 'vid-4', title: 'BOEA Award Night — Red Carpet Coverage', meta: 'Best of Edo Award — Red Carpet', duration: '0:59', tag: 'Red Carpet', thumb: '/assets/boea_6th_edition_poster.jpeg', src: '/assets/boea_video_4.mp4' },
  { id: 'vid-5', title: 'BOEA Cultural Showcase & Heritage Acts', meta: 'Best of Edo Award — Cultural Acts', duration: '0:30', tag: 'Entertainment', thumb: '/assets/coral_beads.jpeg', src: '/assets/boea_video_5.mp4' },
  { id: 'vid-6', title: 'BOEA Award Moment — Special Recognition', meta: 'Best of Edo Award — Special Presentation', duration: '0:15', tag: 'Award Moment', thumb: '/assets/boea_6th_edition_poster.jpeg', src: '/assets/boea_video_6.mp4' },
];

export default function Gallery() {
  const [tab, setTab] = useState('photos');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <main>
      <PageHero
        eyebrow="Gallery & Media"
        title="Moments of Excellence"
        intro="Explore our official photography and event highlights celebrating Edo royalty, cultural heritage, and contemporary achievers across past editions."
      />

      <section className="page-section section">
        <div className="container">
          <div className="gallery-header-row">
            <div className="gallery-tabs">
              <button type="button" className={`gallery-tab ${tab === 'photos' ? 'active' : ''}`} onClick={() => setTab('photos')}>
                <Camera size={18} />
                Photo Gallery ({PHOTOS.length})
              </button>
              <button type="button" className={`gallery-tab ${tab === 'videos' ? 'active' : ''}`} onClick={() => setTab('videos')}>
                <Film size={18} />
                Video Gallery ({VIDEOS.length})
              </button>
            </div>
            <span className="gallery-count label-caps text-muted">
              <Sparkles size={14} className="gold-text inline-icon" /> Past Editions Archive
            </span>
          </div>

          {tab === 'photos' ? (
            <div className="gallery-bento">
              {PHOTOS.map((item) => (
                <article
                  key={item.id}
                  className={`gallery-card gallery-card-${item.span}`}
                  onClick={() => setActivePhoto(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActivePhoto(item)}
                >
                  <div className="gallery-card-bg" style={{ backgroundImage: `url("${item.image}")` }} />
                  <div className="gallery-card-shade" />
                  <span className="gallery-zoom-btn" aria-label="View photo"><ZoomIn size={18} /></span>
                  <div className="gallery-card-caption">
                    {item.tag && <span className="label-caps gallery-card-tag">{item.tag}</span>}
                    <h3 className="gallery-card-title">{item.title}</h3>
                    {item.meta && <p className="caption gallery-card-meta">{item.meta}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="gallery-videos-grid">
              {VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="gallery-video-card"
                  onClick={() => setActiveVideo(video)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveVideo(video)}
                >
                  <div className="gallery-video-bg" style={{ backgroundImage: `url("${video.thumb}")` }} />
                  <div className="gallery-video-overlay" />
                  <span className="gallery-duration-badge">{video.duration}</span>
                  <span className="gallery-play-btn" title="Play Video"><Play size={28} fill="currentColor" /></span>
                  <div className="gallery-card-caption">
                    <span className="label-caps gallery-card-tag">{video.tag}</span>
                    <h3 className="gallery-card-title">{video.title}</h3>
                    <p className="caption gallery-card-meta">{video.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Lightbox */}
      {activePhoto && (
        <div className="video-modal-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div>
                <span className="label-caps gold-text">{activePhoto.tag}</span>
                <h3 className="headline-sm">{activePhoto.title}</h3>
              </div>
              <button type="button" className="video-modal-close" onClick={() => setActivePhoto(null)} aria-label="Close photo">
                <X size={24} />
              </button>
            </div>
            <div className="photo-lightbox-img-wrapper">
              <img src={activePhoto.image} alt={activePhoto.title} className="photo-lightbox-img" />
            </div>
            {activePhoto.meta && <p className="photo-lightbox-caption">{activePhoto.meta}</p>}
          </div>
        </div>
      )}

      {/* Video Modal — real HTML5 player */}
      {activeVideo && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div>
                <span className="label-caps gold-text">{activeVideo.tag}</span>
                <h3 className="headline-sm">{activeVideo.title}</h3>
              </div>
              <button type="button" className="video-modal-close" onClick={() => setActiveVideo(null)} aria-label="Close video player">
                <X size={24} />
              </button>
            </div>
            <div className="video-player-wrapper">
              <video
                key={activeVideo.src}
                controls
                autoPlay
                playsInline
                className="video-player-el"
                poster={activeVideo.thumb}
              >
                <source src={activeVideo.src} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>
            <p className="photo-lightbox-caption">{activeVideo.meta}</p>
          </div>
        </div>
      )}

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
