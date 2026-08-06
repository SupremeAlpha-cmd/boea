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
  FileText,
  HeartHandshake,
  Upload,
  Plus,
  Trash2,
  ShieldAlert,
  Check
} from 'lucide-react';
import './Admin.css';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Award, label: 'Categories' },
  { icon: Users, label: 'Nominations' },
  { icon: Image, label: 'Gallery' },
  { icon: HeartHandshake, label: 'Sponsors' },
  { icon: CalendarDays, label: 'Edition 2026' },
  { icon: FileText, label: 'Pages & Content' },
  { icon: Settings, label: 'Settings' }
];

const DEFAULT_SPONSORS = [
  { id: 'def-1', name: 'Walkfront African Network', category: 'Headline Sponsor', logo: '/logo.png' },
  { id: 'def-2', name: 'Edo State Tourism Board', category: 'Official Partner', logo: '/logo.png' },
  { id: 'def-3', name: 'Benin Cultural Heritage Federation', category: 'Strategic Partner', logo: '/logo.png' },
];

function LoginGate({ onLogin, error }) {
  const [password, setPassword] = useState('');

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <Lock size={28} className="admin-login-icon" />
        <h1 className="headline-lg">BOEA Admin</h1>
        <p className="body-md text-muted">Sign in to manage the platform.</p>
        <form
          className="admin-login-form"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(password);
          }}
        >
          <input
            type="password"
            className="interest-input"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p style={{ color: '#b71c1c', fontSize: '13px', fontWeight: 600, margin: '0.25rem 0 0 0' }}>
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary admin-login-btn">
            Sign In
          </button>
        </form>
        <p className="caption text-muted">Enter administrative credentials to gain access.</p>
      </div>
    </div>
  );
}

function SponsorsManager() {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

    setSponsorName('');
    setLogoBase64('');
    setSuccessMsg('Sponsor logo uploaded successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteSponsor = (id) => {
    const updated = sponsors.filter(sp => sp.id !== id);
    setSponsors(updated);
    localStorage.setItem('boea-sponsors', JSON.stringify(updated));
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
              <label className="label-caps" style={{ fontSize: '11px' }}>Sponsor Name</label>
              <input
                type="text"
                className="interest-input"
                style={{ padding: '0.5rem', border: '1px solid var(--border-bronze-subtle)', borderRadius: '4px', background: 'var(--surface-bright)', color: 'var(--on-background)' }}
                placeholder="e.g. Chevron Nigeria"
                value={sponsorName}
                onChange={(e) => setSponsorName(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label className="label-caps" style={{ fontSize: '11px' }}>Category</label>
              <select
                className="interest-input"
                style={{ padding: '0.5rem', border: '1px solid var(--border-bronze-subtle)', borderRadius: '4px', background: 'var(--surface-bright)', color: 'var(--on-background)' }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Headline Sponsor">Headline Sponsor</option>
                <option value="Platinum Sponsor">Platinum Sponsor</option>
                <option value="Gold Sponsor">Gold Sponsor</option>
                <option value="Official Partner">Official Partner</option>
                <option value="Strategic Partner">Strategic Partner</option>
                <option value="Media Partner">Media Partner</option>
              </select>
            </div>
          </div>

          <div style={{ border: '2px dashed rgba(201, 162, 39, 0.3)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', background: 'rgba(201, 162, 39, 0.02)' }}>
            <input
              type="file"
              id="admin-logo-file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              required={!logoBase64}
            />
            <label htmlFor="admin-logo-file" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--on-surface-variant)' }}>
              <Upload size={20} className="gold-text" />
              {logoBase64 ? <span style={{ color: '#2e7d32', fontWeight: 600 }}>Image loaded successfully!</span> : <span>Click to choose logo file</span>}
            </label>
            {logoBase64 && (
              <div style={{ marginTop: '1rem' }}>
                <img src={logoBase64} alt="Preview" style={{ maxHeight: '60px', objectFit: 'contain', background: 'white', padding: '4px', border: '1px solid var(--border-bronze-subtle)', borderRadius: '4px' }} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
              <Plus size={16} /> Upload Logo
            </button>
            {successMsg && <span style={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><Check size={16} /> {successMsg}</span>}
          </div>
        </form>
      </div>

      <h3 className="headline-sm" style={{ marginBottom: '1rem' }}>Currently Active Sponsors</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {sponsors.map((sp) => (
          <div key={sp.id} style={{ position: 'relative', background: 'var(--surface-bright)', border: '1px solid var(--border-bronze-subtle)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => handleDeleteSponsor(sp.id)}
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(110, 30, 42, 0.1)', color: '#b71c1c', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifycontent: 'center', cursor: 'pointer' }}
              title="Remove Sponsor"
            >
              <Trash2 size={12} style={{ margin: 'auto' }} />
            </button>
            <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifycontent: 'center', background: 'white', padding: '4px', borderRadius: '4px', width: '100%' }}>
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

function ManagerShell() {
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
        <button type="button" className="admin-nav-item admin-logout">
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-content-header">
          <h1 className="headline-md">{active}</h1>
          <span className="label-caps admin-env">Admin Preview</span>
        </header>

        {active === 'Sponsors' ? (
          <SponsorsManager />
        ) : (
          <div className="admin-panel">
            <p className="body-lg text-muted">
              The {active.toLowerCase()} manager will be built here once the backend and
              authentication are connected.
            </p>
            <div className="admin-placeholder">
              <LayoutDashboard size={32} className="admin-placeholder-icon" />
              <p className="body-md text-muted">
                This is a placeholder shell. Coming soon: {active.toLowerCase()} management,
                submissions inbox, gallery uploads and edition planning.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (password) => {
    const requiredPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'boea-admin-2026';
    if (password === requiredPassword) {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect admin password. Please try again.');
    }
  };

  return authed ? <ManagerShell /> : <LoginGate onLogin={handleLogin} error={error} />;
}

