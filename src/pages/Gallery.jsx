import { useState } from 'react';
import { Play, Camera, Film, X, Sparkles, ZoomIn } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import '../styles/pages.css';
import './Gallery.css';

const PHOTOS = [
  { id: 1, span: 'wide', tag: 'Award Night', title: 'Grand Gala Night — Winner Presented with Trophy', meta: 'Recipients Honoured with BOEA Award & Coral Beads Elder', image: '/assets/gala_red_carpet.jpeg' },
  { id: 2, span: 'normal', tag: 'Award Presentation', title: 'Special Recognition Award', meta: 'BOEA 6th Edition — Stage Presentation', image: '/assets/award_presentation_1.jpeg' },
  { id: 3, span: 'normal', tag: 'Award Presentation', title: 'Actress & Producer Recognition', meta: 'BOEA Edition — Arts, Culture & Entertainment', image: '/assets/award_presentation_2.jpeg' },
  { id: 4, span: 'wide', tag: 'Gala Night', title: 'Distinguished Guests at the Grand Banquet', meta: 'BOEA Award Night — Community & Corporate Tables', image: '/assets/gala_guests.jpeg' },
  { id: 5, span: 'normal', tag: 'Award Presentation', title: 'Award Handover — BOEA Stage Moment', meta: 'Honouring Excellence in Leadership & Service', image: '/assets/award_presentation_3.jpeg' },
  { id: 6, span: 'normal', tag: 'Live Performance', title: 'Saxophonist — Live Music at the Gala', meta: 'Cultural Entertainment & Musical Excellence', image: '/assets/saxophonist.jpeg' },
  { id: 7, span: 'normal', tag: 'Gala Night', title: 'Audience Applause — Award Night Atmosphere', meta: 'Celebrating Excellence Across Sectors', image: '/assets/gala_audience.jpeg' },
  { id: 8, span: 'normal', tag: 'Live Performance', title: 'Choir Performance at the Awards', meta: 'Cultural Heritage Through Music & Voice', image: '/assets/choir_performance.jpeg' },
  { id: 9, span: 'wide', tag: 'Red Carpet', title: 'BOEA Red Carpet — Media Interview', meta: 'Best of Edo Awards Red Carpet Coverage', image: '/assets/red_carpet_interview.jpeg' },
  { id: 10, span: 'normal', tag: 'Red Carpet', title: 'BOEA Backdrop — Dignitaries & Guests', meta: 'Best of Edo Awards 5th Edition Backdrop', image: '/assets/boea_5th_edition_backdrop.jpeg' },
  { id: 11, span: 'normal', tag: 'Red Carpet', title: 'MC Holding BOEA Trophy on Stage', meta: '5th Edition — Hosted at BOEA Grand Ceremony', image: '/assets/mc_holding_trophy.jpeg' },
  { id: 12, span: 'normal', tag: 'Red Carpet', title: 'Best of Edo Awards Red Carpet', meta: 'Dignitaries, Winners & Cultural Celebration', image: '/assets/boea_red_carpet_backdrop.jpeg' },
  { id: 13, span: 'normal', tag: 'Red Carpet', title: 'Photo Wall — BOEA Moments', meta: 'Guests at the Official BOEA Photo Wall', image: '/assets/boea_photo_wall.jpeg' },
  { id: 14, span: 'wide', tag: 'Ceremony', title: 'Award Handshake — Recipient & Presenter', meta: 'BOEA — Recognising Excellence in Business & Leadership', image: '/assets/award_handshake.jpeg' },
  { id: 15, span: 'normal', tag: 'Ceremony', title: 'BOEA 6th Edition — Award Poster & Trophy', meta: 'Strictly Entertainment Edition, September 2023', image: '/assets/boea_6th_edition_poster.jpeg' },
  { id: 16, span: 'normal', tag: 'Ceremony', title: 'Award Presentation — Excellence in Education', meta: 'Recipients Receiving Certificate & Trophy', image: '/assets/award_presentation_4.jpeg' },
  { id: 17, span: 'normal', tag: 'Networking', title: 'Group Photo — Nominees & Dignitaries', meta: 'Building Connections at the Best of Edo Awards', image: '/assets/group_photo_1.jpeg' },
  { id: 18, span: 'normal', tag: 'Networking', title: 'Delegates & Partners — Venue Networking', meta: 'Fostering Relationships & Collaboration', image: '/assets/nominees_seated.jpeg' },
  { id: 19, span: 'normal', tag: 'Ceremony', title: 'Award Presentation — Healthcare & Service', meta: 'BOEA Edition — Honouring Community Champions', image: '/assets/award_presentation_5.jpeg' },
  { id: 20, span: 'normal', tag: 'Speaker', title: 'Keynote Speaker at the BOEA Stage', meta: 'Inspiring the Next Generation of Edo Excellence', image: '/assets/speaker_on_stage.jpeg' },
];

const VIDEOS = [
  { id: 'vid-1', title: 'BOEA Gala Night — Award Presentation Highlights', meta: 'Best of Edo Award — Official Event Coverage', duration: '1:00', tag: 'Gala Night', thumb: '/assets/gala_red_carpet.jpeg', src: '/assets/boea_video_1.mp4' },
  { id: 'vid-2', title: 'BOEA Award Night — Stage & Ceremony Moments', meta: 'Best of Edo Award — Stage Performances & Ceremony', duration: '0:36', tag: 'Ceremony', thumb: '/assets/award_presentation_1.jpeg', src: '/assets/boea_video_2.mp4' },
  { id: 'vid-3', title: 'BOEA Event Highlights — Live Atmosphere', meta: 'Best of Edo Award — Live Audience & Event Coverage', duration: '0:35', tag: 'Highlights', thumb: '/assets/gala_audience.jpeg', src: '/assets/boea_video_3.mp4' },
  { id: 'vid-4', title: 'BOEA Award Night — Red Carpet & Arrivals', meta: 'Best of Edo Award — Red Carpet Coverage', duration: '0:59', tag: 'Red Carpet', thumb: '/assets/red_carpet_interview.jpeg', src: '/assets/boea_video_4.mp4' },
  { id: 'vid-5', title: 'BOEA Entertainment — Cultural Performances', meta: 'Best of Edo Award — Live Entertainment & Cultural Acts', duration: '0:30', tag: 'Entertainment', thumb: '/assets/saxophonist.jpeg', src: '/assets/boea_video_5.mp4' },
  { id: 'vid-6', title: 'BOEA Award Moment — Special Recognition', meta: 'Best of Edo Award — Special Award Presentation', duration: '0:15', tag: 'Award Moment', thumb: '/assets/award_presentation_3.jpeg', src: '/assets/boea_video_6.mp4' },
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
