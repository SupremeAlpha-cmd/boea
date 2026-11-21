import { useState, useEffect } from 'react';
import { Play, Camera, Film, X, ZoomIn } from 'lucide-react';
import PageHero from '../components/PageHero';
import NominateCta from '../components/NominateCta';
import RichLinkPreview from '../components/RichLinkPreview';
import { FEATURED_PRESS_LINKS } from '../data/content';
import { cmsFetch, CMS_PATHS } from '../lib/cms';
import '../styles/pages.css';
import './Gallery.css';

// 9th edition (15 November 2026) — the latest gala night, photographed by FAITHFYN.
// Every photo carries the www.faithfynphotography.com watermark along its bottom
// edge; portrait frames are anchored to the bottom in the gallery CSS (see
// .gallery-card-portrait) so the watermark is never cropped off.
export const NINTH_EDITION_PHOTOS = [
  {
    "id": "n1",
    "span": "wide",
    "tag": "Official Backdrop",
    "title": "BOEA 9th Edition — Official Backdrop Wall",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-backdrop-wall.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n2",
    "span": "normal",
    "tag": "Photo Wall",
    "title": "Ushers at the 9th Edition Photo Wall",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-photo-wall-ushers.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n3",
    "span": "normal",
    "tag": "Photo Wall",
    "title": "Guests at the 9th Edition Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-photo-wall-guests.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n4",
    "span": "normal",
    "tag": "Black Carpet",
    "title": "Black Carpet Interview — 9th Edition",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-black-carpet-interview.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n5",
    "span": "normal",
    "tag": "Black Carpet",
    "title": "Guests at the 9th Edition Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-backdrop-guests.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n6",
    "span": "normal",
    "tag": "Black Carpet",
    "title": "Black Carpet Interview Trio",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-backdrop-interview-trio.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n7",
    "span": "wide",
    "tag": "Stage",
    "title": "9th Edition Stage Screen",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-stage-screen.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n8",
    "span": "normal",
    "tag": "Venue",
    "title": "The Hall — Chandeliers and Red-Carpet Aisle",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-hall-chandeliers.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n9",
    "span": "wide",
    "tag": "The Hall",
    "title": "A Packed Hall — 9th Edition Gala Night",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-packed-hall.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n10",
    "span": "normal",
    "tag": "Stage",
    "title": "Live Band on Stage",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-live-band.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n11",
    "span": "wide",
    "tag": "Stage",
    "title": "Cultural Dance Troupe Mid-Performance",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dance-troupe.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n12",
    "span": "normal",
    "tag": "Stage",
    "title": "Acrobatic Lift — Dance Troupe",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-acrobatic-lift.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n13",
    "span": "normal",
    "tag": "Stage",
    "title": "Traditional Dance Couple",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dance-couple.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n14",
    "span": "normal",
    "tag": "Stage",
    "title": "Host in Red on Stage",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-host-red-dress.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n15",
    "span": "normal",
    "tag": "Stage",
    "title": "MC at the Podium — 9th Edition Banner",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-mc-podium.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n16",
    "span": "normal",
    "tag": "Stage",
    "title": "Young Performer in Blue on Stage",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-girl-blue-gown.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n17",
    "span": "normal",
    "tag": "Stage",
    "title": "Young Dancer with the Troupe",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-boy-dancing.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n18",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Trophy Handover and Handshake",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-trophy-handover.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n19",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Handshake and Trophy — Award Recipient",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handshake-trophy.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n20",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Winner with Trophy and Mic",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-winner-trophy-mic.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n21",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Trophy Handover — Award Recipient",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handover-woman.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n22",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Award Handover — Recipient in Blue",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handover-woman-blue.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n23",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Handshake at the 9th Edition Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-handshake-backdrop.jpg",
    "edition": "9th",
    "orientation": "portrait"
  },
  {
    "id": "n24",
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Dignitaries at the Gala Table",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-dignitaries.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n25",
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Guests in Conversation",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-guests-conversation.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n26",
    "span": "normal",
    "tag": "Dignitaries",
    "title": "Host with a Special Guest",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-host-elderly-guest.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n27",
    "span": "wide",
    "tag": "The Hall",
    "title": "The Hall from the Back — Gala in Full Swing",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-hall-from-back.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n28",
    "span": "normal",
    "tag": "Celebration",
    "title": "Celebration at the Table",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-celebration-table.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n29",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Group Photo on Stage — Best of Edo Backdrop",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-stage-group-photo.jpg",
    "edition": "9th",
    "orientation": "landscape"
  },
  {
    "id": "n30",
    "span": "normal",
    "tag": "Award Presentation",
    "title": "Trophy Held Aloft",
    "meta": "9th Edition \u00b7 15 November 2026",
    "image": "/assets/boea-9th-trophy-aloft.jpg",
    "edition": "9th",
    "orientation": "portrait"
  }
];

// Previous editions — the existing site images, unchanged.
export const PREVIOUS_EDITION_PHOTOS = [
  {
    "id": 1,
    "span": "wide",
    "tag": "Official Backdrop",
    "title": "Best of Edo Awards 5th Edition Backdrop",
    "meta": "Official BOEA Stage & Photo Wall",
    "image": "/assets/boea_5th_edition_backdrop.jpeg",
    "edition": "previous"
  },
  {
    "id": 2,
    "span": "normal",
    "tag": "Award Poster",
    "title": "BOEA 6th Edition — Official Award Poster",
    "meta": "Strictly Entertainment Edition Showcase",
    "image": "/assets/boea_6th_edition_poster.jpeg",
    "edition": "previous"
  },
  {
    "id": 3,
    "span": "normal",
    "tag": "Cultural Heritage",
    "title": "Coral Bead Regalia & Edo Heritage",
    "meta": "Great Benin Cultural Symbols & Regalia",
    "image": "/assets/coral_beads.jpeg",
    "edition": "previous"
  },
  {
    "id": 4,
    "span": "wide",
    "tag": "Black Carpet",
    "title": "BOEA Official Black Carpet Backdrop",
    "meta": "Best of Edo Awards Ceremonial Wall",
    "image": "/assets/boea_red_carpet_backdrop.jpeg",
    "edition": "previous"
  },
  {
    "id": 5,
    "span": "normal",
    "tag": "Trophy Emblem",
    "title": "The Great Benin Award Trophy",
    "meta": "Symbol of Excellence, Leadership & Distinction",
    "image": "/assets/boea_6th_edition_poster.jpeg",
    "edition": "previous"
  },
  {
    "id": 6,
    "span": "normal",
    "tag": "Cultural Textiles",
    "title": "Esan Weaving & Heritage Motifs",
    "meta": "Esanland Cultural Heritage Preservation",
    "image": "/assets/coral_bead.jpeg",
    "edition": "previous"
  },
  {
    "id": 7,
    "span": "normal",
    "tag": "Highland Landscape",
    "title": "Ososo Hills — Edo North Highland Majesty",
    "meta": "Natural Heritage of Edo State",
    "image": "/assets/ososo_hills.png",
    "edition": "previous"
  },
  {
    "id": 8,
    "span": "normal",
    "tag": "Media Wall",
    "title": "BOEA Official Media & Photo Wall",
    "meta": "Best of Edo Awards Official Press Wall",
    "image": "/assets/boea_photo_wall.jpeg",
    "edition": "previous"
  }
];

// Fallback gallery: 9th edition first, then previous editions.
export const INITIAL_PHOTOS = [...NINTH_EDITION_PHOTOS, ...PREVIOUS_EDITION_PHOTOS];

export const INITIAL_VIDEOS = [
  {
    "id": "vid-1",
    "title": "BOEA Gala Night \u2014 Official Highlights",
    "meta": "Best of Edo Award \u2014 Event Coverage",
    "duration": "1:00",
    "tag": "Gala Night",
    "thumb": "/assets/boea_red_carpet_backdrop.jpeg",
    "src": "/assets/boea_video_1.mp4"
  },
  {
    "id": "vid-2",
    "title": "BOEA Award Night \u2014 Stage Moments",
    "meta": "Best of Edo Award \u2014 Ceremony Coverage",
    "duration": "0:36",
    "tag": "Ceremony",
    "thumb": "/assets/boea_5th_edition_backdrop.jpeg",
    "src": "/assets/boea_video_2.mp4"
  },
  {
    "id": "vid-3",
    "title": "BOEA Event Highlights — Atmosphere",
    "meta": "Best of Edo Award — Event Atmosphere",
    "duration": "0:35",
    "tag": "Highlights",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/assets/boea_video_3.mp4"
  },
  {
    "id": "vid-4",
    "title": "BOEA Award Night — Black Carpet Coverage",
    "meta": "Best of Edo Award — Black Carpet",
    "duration": "0:59",
    "tag": "Black Carpet",
    "thumb": "/assets/boea_6th_edition_poster.jpeg",
    "src": "/assets/boea_video_4.mp4"
  },
  {
    "id": "vid-5",
    "title": "BOEA Cultural Showcase & Heritage Acts",
    "meta": "Best of Edo Award — Cultural Acts",
    "duration": "0:30",
    "tag": "Entertainment",
    "thumb": "/assets/coral_beads.jpeg",
    "src": "/assets/boea_video_5.mp4"
  },
  {
    "id": "vid-6",
    "title": "BOEA Award Moment — Special Recognition",
    "meta": "Best of Edo Award — Special Presentation",
    "duration": "0:15",
    "tag": "Award Moment",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/assets/boea_video_6.mp4"
  },
  {
    "id": "vid-renamed-1",
    "title": "BOEA Gala Highlights & Stage Clip 1",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:35",
    "tag": "Gala Night",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/images/boea_video_clip_01.mp4"
  },
  {
    "id": "vid-renamed-2",
    "title": "BOEA Gala Highlights & Stage Clip 2",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:40",
    "tag": "Stage Ceremony",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/images/boea_video_clip_02.mp4"
  },
  {
    "id": "vid-renamed-3",
    "title": "BOEA Gala Highlights & Stage Clip 3",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:45",
    "tag": "Gala Night",
    "thumb": "/assets/boea_5th_edition_backdrop.jpeg",
    "src": "/images/boea_video_clip_03.mp4"
  },
  {
    "id": "vid-renamed-4",
    "title": "BOEA Gala Highlights & Stage Clip 4",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:50",
    "tag": "Stage Ceremony",
    "thumb": "/assets/boea_red_carpet_backdrop.jpeg",
    "src": "/images/boea_video_clip_04.mp4"
  },
  {
    "id": "vid-renamed-5",
    "title": "BOEA Gala Highlights & Stage Clip 5",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:55",
    "tag": "Gala Night",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/images/boea_video_clip_05.mp4"
  },
  {
    "id": "vid-renamed-6",
    "title": "BOEA Gala Highlights & Stage Clip 6",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "0:30",
    "tag": "Stage Ceremony",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/images/boea_video_clip_06.mp4"
  },
  {
    "id": "vid-renamed-7",
    "title": "BOEA Official Awardees Gala Documentary",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "2:15",
    "tag": "Official Documentary",
    "thumb": "/assets/boea_brand_award_image.jpeg",
    "src": "/images/boea_gala_documentary.mp4"
  },
  {
    "id": "vid-renamed-8",
    "title": "EPP Media Executive Press Coverage",
    "meta": "Best of Edo Award — Video Archive",
    "duration": "1:45",
    "tag": "Media Press",
    "thumb": "/assets/boea_brand_logo+branding.jpeg",
    "src": "/images/boea_epp_press_coverage.mp4"
  }
];

export default function Gallery() {
  const [tab, setTab] = useState('photos');
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const sanitizeVideos = (list) =>
      list.map((v) =>
        v.thumb === '/assets/boea_photo_wall.jpeg'
          ? { ...v, thumb: '/assets/boea_brand_award_image.jpeg' }
          : v
      );
    // The 9th-edition set is always present: CMS photos still render, and the
    // new set is merged in (deduped by image) so the two-group layout shows
    // even before the admin adds anything to the CMS.
    const mergePhotos = (list) => {
      const seen = new Set(list.map((p) => p.image));
      const missing = NINTH_EDITION_PHOTOS.filter((p) => !seen.has(p.image));
      return [...missing, ...list];
    };
    cmsFetch(CMS_PATHS.galleryPhotos, INITIAL_PHOTOS).then((list) => {
      if (!cancelled) setPhotos(Array.isArray(list) ? mergePhotos(list) : INITIAL_PHOTOS);
    });
    cmsFetch(CMS_PATHS.galleryVideos, INITIAL_VIDEOS).then((list) => {
      if (!cancelled) setVideos(Array.isArray(list) ? sanitizeVideos(list) : INITIAL_VIDEOS);
    });
    return () => { cancelled = true; };
  }, []);

  const isNinthEdition = (item) =>
    item.edition === '9th' ||
    (typeof item.image === 'string' && item.image.includes('/assets/boea-9th-'));
  const ninthPhotos = photos.filter(isNinthEdition);
  const previousPhotos = photos.filter((p) => !isNinthEdition(p));

  const renderPhotoCard = (item) => (
    <article
      key={item.id}
      className={`gallery-card gallery-card-${item.span || 'normal'}${item.orientation === 'portrait' ? ' gallery-card-portrait' : ''}`}
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
  );

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
                Photo Gallery ({photos.length})
              </button>
              <button type="button" className={`gallery-tab ${tab === 'videos' ? 'active' : ''}`} onClick={() => setTab('videos')}>
                <Film size={18} />
                Video Gallery ({videos.length})
              </button>
            </div>
            <span className="gallery-count label-caps text-muted">
              Past Editions Archive
            </span>
          </div>

          {tab === 'photos' ? (
            <div>
              {ninthPhotos.length > 0 && (
                <section className="gallery-group" aria-label="9th edition photos">
                  <div className="gallery-group-head">
                    <span className="label-caps gold-text">The latest</span>
                    <h2 className="headline-md gallery-group-title">9th edition</h2>
                    <p className="body-sm text-muted">
                      15 November 2026 — fresh from the black carpet, the stage and the awards.
                    </p>
                  </div>
                  <div className="gallery-bento">
                    {ninthPhotos.map(renderPhotoCard)}
                  </div>
                </section>
              )}
              {previousPhotos.length > 0 && (
                <section className="gallery-group" aria-label="Previous edition photos">
                  <div className="gallery-group-head">
                    <span className="label-caps gold-text">Archive</span>
                    <h2 className="headline-md gallery-group-title">Previous edition</h2>
                    <p className="body-sm text-muted">
                      Moments from earlier editions of the Best of Edo Awards.
                    </p>
                  </div>
                  <div className="gallery-bento">
                    {previousPhotos.map(renderPhotoCard)}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div>
              <div className="gallery-videos-grid" style={{ marginBottom: '3rem' }}>
                {videos.map((video) => (
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

              {/* Social Media Broadcast Reels Section */}
              <div style={{ background: 'var(--surface-bright)', border: '1px solid var(--border-bronze-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem 1.5rem', marginTop: '2rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <span className="label-caps gold-text">Social Media Broadcast Reels</span>
                  <h3 className="headline-md" style={{ margin: '0.25rem 0' }}>Featured Television & Social Video Links</h3>
                  <p className="body-sm text-muted" style={{ margin: 0 }}>
                    Watch official broadcast reels and social media video links covering the Best of Edo Award Gala nights.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {FEATURED_PRESS_LINKS.filter((item) => item.type === 'video').map((item) => (
                    <RichLinkPreview key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Photo Lightbox */}
      {activePhoto && (
        <div className="video-modal-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div style={{ textAlign: 'left' }}>
                <span className="label-caps gold-text">{activePhoto.tag}</span>
                <h3 className="headline-md" style={{ margin: 0 }}>{activePhoto.title}</h3>
              </div>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActivePhoto(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="photo-modal-img-wrap">
              <img src={activePhoto.image} alt={activePhoto.title} className="photo-modal-img" />
            </div>
            {activePhoto.meta && (
              <p className="body-sm text-muted" style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                {activePhoto.meta}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div style={{ textAlign: 'left' }}>
                <span className="label-caps gold-text">{activeVideo.tag}</span>
                <h3 className="headline-md" style={{ margin: 0 }}>{activeVideo.title}</h3>
              </div>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="video-modal-player-wrap">
              <video
                src={activeVideo.src}
                controls
                autoPlay
                className="video-modal-player"
              />
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
