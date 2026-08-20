import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Award,
  Image,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  FileText,
  HeartHandshake,
  Upload,
  Plus,
  Trash2,
  ShieldAlert,
  Check,
  History,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { INITIAL_PHOTOS, INITIAL_VIDEOS } from './Gallery';
import { useAdminAuth } from '../hooks/useAdminAuth';
import './Admin.css';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Award, label: 'Categories' },
  { icon: Users, label: 'Nominations' },
  { icon: Image, label: 'Gallery' },
  { icon: HeartHandshake, label: 'Sponsors' },
  { icon: CalendarDays, label: 'Edition 2026' },
  { icon: FileText, label: 'Pages & Content' },
  { icon: Settings, label: 'Settings & Security' }
];

const DEFAULT_SPONSORS = [
  { id: 'def-1', name: 'Walkfront African Network', category: 'Headline Sponsor', logo: '/logo.png' },
  { id: 'def-2', name: 'Edo State Tourism Board', category: 'Official Partner', logo: '/logo.png' },
  { id: 'def-3', name: 'Benin Cultural Heritage Federation', category: 'Strategic Partner', logo: '/logo.png' },
];

function LoginGate({ onLogin, error }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password, rememberMe);
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-icon-box">
          <Lock size={26} className="gold-text" />
        </div>
        <span className="label-caps gold-text">Best of Edo Award Portal</span>
        <h1 className="headline-lg" style={{ margin: '0.25rem 0 0.5rem 0' }}>Admin Authentication</h1>
        <p className="body-sm text-muted" style={{ marginBottom: '1.5rem' }}>
          Enter administrative master passkey to access portal controls.
        </p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-pass-input-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              className="admin-pass-input"
              placeholder="Admin Master Passkey"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="admin-pass-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.5rem 0', width: '100%', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: 'var(--on-surface-variant)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me (7 days)
            </label>
          </div>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '13px', textAlign: 'left', margin: '0.5rem 0 1rem 0', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-gold admin-login-btn" style={{ width: '100%', gap: '0.5rem', justifyContent: 'center' }}>
            <UserCheck size={18} /> Sign In to Portal
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--outline-variant)', fontSize: '11px', color: 'var(--on-surface-variant)' }}>
          Authorized BOEA Personnel Only
        </div>
      </div>
    </div>
  );
}

function SettingsSecurityManager({ onChangePassword, auditLogs }) {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState({ text: '', type: '' });

  const handlePassChange = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setPassMsg({ text: 'New passwords do not match.', type: 'error' });
      return;
    }

    const res = onChangePassword(currentPass, newPass);
    if (res.success) {
      setPassMsg({ text: 'Master password updated successfully!', type: 'success' });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      setPassMsg({ text: res.error, type: 'error' });
    }
  };

  return (
    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="upload-section-card" style={{ padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <KeyRound size={20} className="gold-text" />
          <h3 className="headline-sm" style={{ margin: 0 }}>Update Master Passkey</h3>
        </div>

        {passMsg.text && (
          <div style={{ background: passMsg.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: passMsg.type === 'success' ? '#10b981' : '#ef4444', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 600 }}>
            {passMsg.text}
          </div>
        )}

        <form onSubmit={handlePassChange} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
          <div>
            <label className="admin-label">Current Passkey</label>
            <input
              type="password"
              className="admin-input"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="admin-label">New Passkey (min. 6 chars)</label>
            <input
              type="password"
              className="admin-input"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="admin-label">Confirm New Passkey</label>
            <input
              type="password"
              className="admin-input"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
            Update Security Credentials
          </button>
        </form>
      </div>

      <div className="upload-section-card" style={{ padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <History size={20} className="gold-text" />
          <h3 className="headline-sm" style={{ margin: 0 }}>System Audit Action Trail</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--outline-variant)', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem', color: 'var(--secondary)' }}>Timestamp</th>
                <th style={{ padding: '0.5rem', color: 'var(--secondary)' }}>Action</th>
                <th style={{ padding: '0.5rem', color: 'var(--secondary)' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
                    No audit records recorded yet.
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--outline-variant)' }}>
                    <td style={{ padding: '0.5rem', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                    <td style={{ padding: '0.5rem', fontWeight: 600, color: 'var(--on-background)' }}>{log.action}</td>
                    <td style={{ padding: '0.5rem', color: 'var(--on-surface-variant)' }}>{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SponsorsManager({ logAuditAction }) {
  const [sponsors, setSponsors] = useState([]);
  const [sponsorName, setSponsorName] = useState('');
  const [category, setCategory] = useState('Headline Sponsor');
  const [logoBase64, setLogoBase64] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('boea-sponsors');
    if (saved) {
      try {
        setSponsors(JSON.parse(saved));
      } catch (e) {
        setSponsors(DEFAULT_SPONSORS);
      }
    } else {
      setSponsors(DEFAULT_SPONSORS);
    }
  }, []);

  const handleAddSponsor = (e) => {
    e.preventDefault();
    if (!sponsorName.trim() || !logoBase64) return;

    const newSponsor = {
      id: 'sp-' + Date.now(),
      name: sponsorName,
      category: category,
      logo: logoBase64
    };

    const updated = [newSponsor, ...sponsors];
    setSponsors(updated);
    localStorage.setItem('boea-sponsors', JSON.stringify(updated));

    if (logAuditAction) logAuditAction('Added Sponsor Logo', `Sponsor: ${sponsorName} (${category})`);

    setSponsorName('');
    setLogoBase64('');
    setSuccessMsg('Sponsor logo uploaded successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteSponsor = (id) => {
    const spToDelete = sponsors.find(s => s.id === id);
    const updated = sponsors.filter(sp => sp.id !== id);
    setSponsors(updated);
    localStorage.setItem('boea-sponsors', JSON.stringify(updated));
    if (logAuditAction && spToDelete) logAuditAction('Deleted Sponsor', `Removed: ${spToDelete.name}`);
  };

  return (
    <div className="sponsors-manager-wrap" style={{ textAlign: 'left' }}>
      <div className="upload-section-card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
        <div className="upload-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <ShieldAlert size={20} className="gold-text" />
          <h3 className="headline-sm" style={{ margin: 0 }}>Add New Sponsor / Partner Logo</h3>
        </div>
        <form onSubmit={handleAddSponsor} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="admin-label">Sponsor Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Chevron Nigeria"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="admin-label">Category</label>
              <select
                className="admin-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Headline Sponsor">Headline Sponsor</option>
                <option value="Official Partner">Official Partner</option>
                <option value="Strategic Partner">Strategic Partner</option>
                <option value="Media Partner">Media Partner</option>
                <option value="CSR Partner">CSR Partner</option>
              </select>
            </div>
          </div>

          <div style={{ border: '2px dashed rgba(201, 162, 39, 0.3)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
            <input type="file" id="admin-sponsor-logo" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setLogoBase64(reader.result);
                reader.readAsDataURL(file);
              }
            }} />
            <label htmlFor="admin-sponsor-logo" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={24} className="gold-text" />
              {logoBase64 ? <span style={{ color: '#10b981', fontWeight: 600 }}>Logo selected successfully!</span> : <span>Click to choose sponsor logo file</span>}
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
            <Plus size={16} /> Save & Publish Sponsor Logo
          </button>
        </form>
      </div>

      <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Currently Active Sponsors ({sponsors.length})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {sponsors.map((sp) => (
          <div key={sp.id} style={{ position: 'relative', background: 'var(--surface-bright)', border: '1px solid var(--border-bronze-subtle)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => handleDeleteSponsor(sp.id)}
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(110, 30, 42, 0.1)', color: '#b71c1c', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              title="Remove Sponsor"
            >
              <Trash2 size={12} style={{ margin: 'auto' }} />
            </button>
            <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '4px', borderRadius: '4px', width: '100%' }}>
              <img src={sp.logo} alt={sp.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--on-background)', marginTop: '0.25rem' }}>{sp.name}</div>
            <div style={{ fontSize: '10px', color: 'var(--secondary)' }} className="label-caps">{sp.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryManager({ logAuditAction }) {
  const [tab, setTab] = useState('photos');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Photo form fields
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoTag, setPhotoTag] = useState('Official Gala');
  const [photoMeta, setPhotoMeta] = useState('');
  const [photoSpan, setPhotoSpan] = useState('normal');
  const [photoImgBase64, setPhotoImgBase64] = useState('');

  // Video form fields
  const [videoTitle, setVideoTitle] = useState('');
  const [videoTag, setVideoTag] = useState('Gala Night');
  const [videoMeta, setVideoMeta] = useState('');
  const [videoDuration, setVideoDuration] = useState('0:45');
  const [videoSrc, setVideoSrc] = useState('/assets/boea_video_1.mp4');
  const [videoThumb, setVideoThumb] = useState('/assets/boea_photo_wall.jpeg');

  useEffect(() => {
    const savedPhotos = localStorage.getItem('boea-gallery-photos');
    if (savedPhotos) {
      try { setPhotos(JSON.parse(savedPhotos)); } catch (e) { setPhotos(INITIAL_PHOTOS); }
    } else {
      setPhotos(INITIAL_PHOTOS);
    }

    const savedVideos = localStorage.getItem('boea-gallery-videos');
    if (savedVideos) {
      try { setVideos(JSON.parse(savedVideos)); } catch (e) { setVideos(INITIAL_VIDEOS); }
    } else {
      setVideos(INITIAL_VIDEOS);
    }
  }, []);

  const handlePhotoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoImgBase64(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!photoTitle.trim() || !photoImgBase64) return;

    const newPhoto = {
      id: 'photo-' + Date.now(),
      title: photoTitle,
      tag: photoTag,
      meta: photoMeta || 'BOEA Gallery Showcase',
      span: photoSpan,
      image: photoImgBase64
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    localStorage.setItem('boea-gallery-photos', JSON.stringify(updated));
    if (logAuditAction) logAuditAction('Uploaded Gallery Photo', `Title: ${photoTitle}`);

    setPhotoTitle('');
    setPhotoMeta('');
    setPhotoImgBase64('');
    setSuccessMsg('Photo uploaded and published to Gallery!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeletePhoto = (id) => {
    const itemToDelete = photos.find(p => p.id === id);
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    localStorage.setItem('boea-gallery-photos', JSON.stringify(updated));
    if (logAuditAction && itemToDelete) logAuditAction('Deleted Gallery Photo', `Title: ${itemToDelete.title}`);
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    const newVideo = {
      id: 'vid-' + Date.now(),
      title: videoTitle,
      tag: videoTag,
      meta: videoMeta || 'BOEA Video Coverage',
      duration: videoDuration,
      src: videoSrc,
      thumb: videoThumb
    };

    const updated = [newVideo, ...videos];
    setVideos(updated);
    localStorage.setItem('boea-gallery-videos', JSON.stringify(updated));
    if (logAuditAction) logAuditAction('Published Video Entry', `Title: ${videoTitle}`);

    setVideoTitle('');
    setVideoMeta('');
    setSuccessMsg('Video added and published to Video Gallery!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteVideo = (id) => {
    const vidToDelete = videos.find(v => v.id === id);
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    localStorage.setItem('boea-gallery-videos', JSON.stringify(updated));
    if (logAuditAction && vidToDelete) logAuditAction('Deleted Video Entry', `Title: ${vidToDelete.title}`);
  };

  return (
    <div className="gallery-manager-wrap" style={{ textAlign: 'left' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.75rem' }}>
        <button
          type="button"
          className={`btn ${tab === 'photos' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('photos')}
        >
          Manage Photos ({photos.length})
        </button>
        <button
          type="button"
          className={`btn ${tab === 'videos' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('videos')}
        >
          Manage Videos ({videos.length})
        </button>
      </div>

      {successMsg && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <Check size={18} /> {successMsg}
        </div>
      )}

      {tab === 'photos' ? (
        <>
          <div className="upload-section-card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
            <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Upload & Add New Photo</h3>
            <form onSubmit={handleAddPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="admin-label">Photo Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Royal Delegates & Laureates"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="admin-label">Category Tag</label>
                  <select className="admin-select" value={photoTag} onChange={(e) => setPhotoTag(e.target.value)}>
                    <option value="Official Gala">Official Gala</option>
                    <option value="Red Carpet">Red Carpet</option>
                    <option value="Cultural Heritage">Cultural Heritage</option>
                    <option value="Award Presentation">Award Presentation</option>
                    <option value="Behind The Scenes">Behind The Scenes</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Card Grid Layout</label>
                  <select className="admin-select" value={photoSpan} onChange={(e) => setPhotoSpan(e.target.value)}>
                    <option value="normal">Standard Card</option>
                    <option value="wide">Wide Featured Card</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Caption / Metadata (optional)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Benin City Gala Night Showcase"
                  value={photoMeta}
                  onChange={(e) => setPhotoMeta(e.target.value)}
                />
              </div>

              <div style={{ border: '2px dashed rgba(201, 162, 39, 0.3)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                <input type="file" id="admin-photo-file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoFileUpload} />
                <label htmlFor="admin-photo-file" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={24} className="gold-text" />
                  {photoImgBase64 ? <span style={{ color: '#10b981', fontWeight: 600 }}>Image selected successfully!</span> : <span>Click to choose photo file</span>}
                </label>
                {photoImgBase64 && (
                  <div style={{ marginTop: '1rem' }}>
                    <img src={photoImgBase64} alt="Preview" style={{ maxHeight: '100px', borderRadius: '6px' }} />
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                <Plus size={16} /> Publish Photo to Gallery
              </button>
            </form>
          </div>

          <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Published Photos ({photos.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {photos.map((item) => (
              <div key={item.id} style={{ position: 'relative', background: 'var(--surface-bright)', border: '1px solid var(--border-bronze-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(item.id)}
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Delete Photo"
                >
                  <Trash2 size={14} />
                </button>
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '0.75rem' }}>
                  <span className="label-caps" style={{ fontSize: '10px', color: 'var(--secondary)' }}>{item.tag}</span>
                  <div style={{ fontSize: '13px', fontWeight: 700, margin: '0.2rem 0' }}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="upload-section-card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
            <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Add New Video Entry</h3>
            <form onSubmit={handleAddVideo} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="admin-label">Video Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Gala Night Award Presentation"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="admin-label">Category Tag</label>
                  <select className="admin-select" value={videoTag} onChange={(e) => setVideoTag(e.target.value)}>
                    <option value="Gala Night">Gala Night</option>
                    <option value="Ceremony">Ceremony</option>
                    <option value="Red Carpet">Red Carpet</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Highlights">Highlights</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Duration</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. 1:15"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="admin-label">Video Source URL / Asset Path</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="/assets/boea_video_1.mp4"
                    value={videoSrc}
                    onChange={(e) => setVideoSrc(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="admin-label">Poster Thumbnail Image Path</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="/assets/boea_photo_wall.jpeg"
                    value={videoThumb}
                    onChange={(e) => setVideoThumb(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                <Plus size={16} /> Publish Video to Gallery
              </button>
            </form>
          </div>

          <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Published Videos ({videos.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {videos.map((vid) => (
              <div key={vid.id} style={{ position: 'relative', background: 'var(--surface-bright)', border: '1px solid var(--border-bronze-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => handleDeleteVideo(vid.id)}
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Delete Video"
                >
                  <Trash2 size={14} />
                </button>
                <div style={{ height: '130px', overflow: 'hidden', position: 'relative' }}>
                  <img src={vid.thumb} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.75)', color: '#fff', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '10px' }}>{vid.duration}</span>
                </div>
                <div style={{ padding: '0.75rem' }}>
                  <span className="label-caps" style={{ fontSize: '10px', color: 'var(--secondary)' }}>{vid.tag}</span>
                  <div style={{ fontSize: '13px', fontWeight: 700, margin: '0.2rem 0' }}>{vid.title}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ManagerShell({ onLogout, onChangePassword, auditLogs, logAuditAction }) {
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">B</span>
          <span>BOEA Admin</span>
        </div>
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`admin-nav-item ${active === item.label ? 'active' : ''}`}
                onClick={() => setActive(item.label)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button type="button" onClick={onLogout} className="admin-nav-item admin-logout">
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-content-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="headline-md" style={{ margin: 0 }}>{active}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="label-caps" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <UserCheck size={14} /> Authenticated Admin Session
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="btn btn-outline"
              style={{ padding: '0.35rem 0.75rem', fontSize: '12px', gap: '0.35rem' }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </header>

        {active === 'Sponsors' ? (
          <SponsorsManager logAuditAction={logAuditAction} />
        ) : active === 'Gallery' ? (
          <GalleryManager logAuditAction={logAuditAction} />
        ) : active === 'Settings & Security' ? (
          <SettingsSecurityManager onChangePassword={onChangePassword} auditLogs={auditLogs} />
        ) : (
          <div className="admin-panel">
            <p className="body-lg text-muted">
              The {active.toLowerCase()} portal interface is connected to the BOEA admin database.
            </p>
            <div className="admin-placeholder">
              <LayoutDashboard size={32} className="admin-placeholder-icon" />
              <p className="body-md text-muted">
                Admin control for {active.toLowerCase()} management is active. Use the sidebar to switch between Gallery, Sponsors, and Security settings.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Admin() {
  const { isAuthenticated, authError, login, logout, changePassword, auditLogs, logAuditAction } = useAdminAuth();

  return isAuthenticated ? (
    <ManagerShell
      onLogout={logout}
      onChangePassword={changePassword}
      auditLogs={auditLogs}
      logAuditAction={logAuditAction}
    />
  ) : (
    <LoginGate onLogin={login} error={authError} />
  );
}
