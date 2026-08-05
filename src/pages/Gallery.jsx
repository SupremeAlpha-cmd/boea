import { useState } from 'react';
import { Play, Camera, Film, X, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './Gallery.css';

const PHOTOS = [
  {
    id: 1,
    span: 'wide',
    tag: 'Edo South Heritage',
    title: 'Royal Coral Regalia & Crown',
    meta: 'Symbol of Edo Royalty, Strength & Dignity',
    image: '/assets/coral_beads.jpeg'
  },
  {
    id: 2,
    span: 'normal',
    tag: 'Edo North Pride',
    title: 'Ososo Hills Highland Splendor',
    meta: 'Granite Peaks & Afemai Resilience',
    image: '/assets/ososo_hills.png'
  },
  {
    id: 3,
    span: 'normal',
    tag: 'Edo Central Craft',
    title: 'Esan Cultural Attire & Rhythm',
    meta: 'Textiles, Intellect & Tradition',
    image: '/assets/esan_culture.png'
  },
  {
    id: 4,
    span: 'wide',
    tag: 'Gala Night Highlights',
    title: 'Grand Red Carpet & Award Night',
    meta: 'Honouring Outstanding Achievers',
    image: '/assets/gala_red_carpet.png'
  }
];

const VIDEOS = [
  {
    id: 'vid-1',
    title: 'The Prestigious Best of Edo Award 2026 Documentary',
    meta: '4:15 min • Official Edition Overview',
    duration: '04:15',
    tag: 'Docuseries',
    thumb: '/assets/gala_red_carpet.png',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-2',
    title: 'Edo South Heritage: Coral Beads & Royalty',
    meta: '3:45 min • Cultural Heritage',
    duration: '03:45',
    tag: 'Heritage',
    thumb: '/assets/coral_beads.jpeg',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-3',
    title: 'Highland Majesty: Ososo Hills & Afemai Achievers',
    meta: '5:20 min • Regional Spotlight',
    duration: '05:20',
    tag: 'Spotlight',
    thumb: '/assets/ososo_hills.png',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'vid-4',
    title: 'The Spirit of Esanland: Intellect & Enterprise',
    meta: '4:00 min • Culture & Progress',
    duration: '04:00',
    tag: 'Culture',
    thumb: '/assets/esan_culture.png',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  }
];

export default function Gallery() {
  const [tab, setTab] = useState('photos');
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <main>
      <PageHero
        eyebrow="Gallery & Media"
        title="Moments of Excellence"
        intro="Explore our official photography and documentary highlights celebrating Edo royalty, cultural heritage, and contemporary achievers."
      />

      <section className="page-section section">
        <div className="container">
          <div className="gallery-header-row">
            <div className="gallery-tabs">
              <button
                type="button"
                className={`gallery-tab ${tab === 'photos' ? 'active' : ''}`}
                onClick={() => setTab('photos')}
              >
                <Camera size={18} />
                Photo Gallery ({PHOTOS.length})
              </button>
              <button
                type="button"
                className={`gallery-tab ${tab === 'videos' ? 'active' : ''}`}
                onClick={() => setTab('videos')}
              >
                <Film size={18} />
                Video Gallery ({VIDEOS.length})
              </button>
            </div>
            <span className="gallery-count label-caps text-muted">
              <Sparkles size={14} className="gold-text inline-icon" /> 9th Edition Archive
            </span>
          </div>

          {tab === 'photos' ? (
            <div className="gallery-bento">
              {PHOTOS.map((item) => (
                <article key={item.id} className={`gallery-card gallery-card-${item.span}`}>
                  <div
                    className="gallery-card-bg"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  />
                  <div className="gallery-card-shade" />
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
                  <div
                    className="gallery-video-bg"
                    style={{ backgroundImage: `url("${video.thumb}")` }}
                  />
                  <div className="gallery-video-overlay" />
                  <span className="gallery-duration-badge">{video.duration}</span>
                  <span className="gallery-play-btn" title="Play Video">
                    <Play size={28} fill="currentColor" />
                  </span>
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

      {/* Video Modal Lightbox */}
      {activeVideo && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div>
                <span className="label-caps gold-text">{activeVideo.tag}</span>
                <h3 className="headline-sm">{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video player"
              >
                <X size={24} />
              </button>
            </div>
            <div className="video-player-wrapper">
              <div className="video-placeholder-player">
                <Play size={48} className="gold-text play-large" />
                <p className="body-lg">{activeVideo.title}</p>
                <p className="caption text-muted">
                  Official documentary video stream for the 9th Edition 2026.
                </p>
              </div>
            </div>
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
