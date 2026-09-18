import { useState, useEffect } from 'react';
import {
  Radio,
  Tv,
  DollarSign,
  Key,
  Plus,
  Trash2,
  Copy,
  Check,
  Globe,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  getStoredStreamConfig,
  saveStreamConfig,
  getStoredPasskeys,
  savePasskeys,
  generatePasskey,
  extractYouTubeId,
  formatYouTubeEmbedUrl
} from '../data/streamData';

export default function LiveStreamManager({ logAuditAction }) {
  const [config, setConfig] = useState(getStoredStreamConfig());
  const [passkeys, setPasskeys] = useState(getStoredPasskeys());
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  // Passkey generator field
  const [passkeyLabel, setPasskeyLabel] = useState('');

  useEffect(() => {
    setConfig(getStoredStreamConfig());
    setPasskeys(getStoredPasskeys());
  }, []);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    saveStreamConfig(config);
    if (logAuditAction) {
      logAuditAction('Updated Live Stream Config', `Status: ${config.status}, YouTube: ${config.youtubeUrl}`);
    }
    setSuccessMsg('Live stream configuration updated successfully! Changes are live on the website.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleGeneratePasskey = (e) => {
    e.preventDefault();
    const label = passkeyLabel.trim() || 'VIP Foreign Pass';
    const newPass = generatePasskey(label);
    const updated = getStoredPasskeys();
    setPasskeys(updated);
    setPasskeyLabel('');
    if (logAuditAction) {
      logAuditAction('Generated Stream Passkey', `Code: ${newPass.code} (${label})`);
    }
  };

  const handleDeletePasskey = (code) => {
    const updated = passkeys.filter((p) => p.code !== code);
    setPasskeys(updated);
    savePasskeys(updated);
    if (logAuditAction) {
      logAuditAction('Revoked Stream Passkey', `Code: ${code}`);
    }
  };

  const handleCopyPasskey = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  const rawId = extractYouTubeId(config.youtubeUrl);
  const previewEmbedUrl = formatYouTubeEmbedUrl(config.youtubeUrl);

  return (
    <div className="livestream-manager-wrap" style={{ textAlign: 'left' }}>
      <div className="upload-section-card" style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radio size={22} className="gold-text" />
            <h3 className="headline-sm" style={{ margin: 0 }}>Live Broadcast Controls & Broadcast Status</h3>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className={`btn ${config.status === 'live' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setConfig({ ...config, status: 'live' })}
              style={{ padding: '0.4rem 0.85rem', fontSize: '12px', background: config.status === 'live' ? '#ef4444' : '', borderColor: config.status === 'live' ? '#ef4444' : '' }}
            >
              🔴 LIVE NOW
            </button>
            <button
              type="button"
              className={`btn ${config.status === 'upcoming' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setConfig({ ...config, status: 'upcoming' })}
              style={{ padding: '0.4rem 0.85rem', fontSize: '12px' }}
            >
              ⏰ UPCOMING
            </button>
            <button
              type="button"
              className={`btn ${config.status === 'ended' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setConfig({ ...config, status: 'ended' })}
              style={{ padding: '0.4rem 0.85rem', fontSize: '12px' }}
            >
              ⏹️ CONCLUDED
            </button>
          </div>
        </div>

        {successMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <Check size={18} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="admin-label">Broadcast Stream Title *</label>
            <input
              type="text"
              className="admin-input"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="admin-label">Broadcast Subtitle / Description</label>
            <input
              type="text"
              className="admin-input"
              value={config.subtitle}
              onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
            />
          </div>

          <div className="admin-form-grid-2">
            <div>
              <label className="admin-label">YouTube Video URL or Video ID *</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={config.youtubeUrl}
                onChange={(e) => setConfig({ ...config, youtubeUrl: e.target.value })}
                required
              />
              <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '0.25rem', display: 'block' }}>
                Paste any YouTube Live link, YouTube video URL, or Video ID (e.g. <code>dQw4w9WgXcQ</code>)
              </span>
            </div>

            <div>
              <label className="admin-label">Event Date & Time (WAT)</label>
              <input
                type="datetime-local"
                className="admin-input"
                value={config.eventDate ? config.eventDate.substring(0, 16) : ''}
                onChange={(e) => setConfig({ ...config, eventDate: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div>
              <label className="admin-label">Foreign Viewer Price ($USD)</label>
              <input
                type="number"
                min="0"
                step="1"
                className="admin-input"
                value={config.foreignPriceUSD}
                onChange={(e) => setConfig({ ...config, foreignPriceUSD: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="admin-label">Ticker Announcement Text</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Red Carpet starts at 5:00 PM..."
                value={config.announcement}
                onChange={(e) => setConfig({ ...config, announcement: e.target.value })}
              />
            </div>
          </div>

          {/* YouTube Player Preview */}
          {previewEmbedUrl && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--surface-bright)', borderRadius: '8px', border: '1px solid var(--border-bronze-subtle)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Tv size={16} /> Live Player Embed Preview (Extracted YouTube ID: {rawId})
              </div>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '6px' }}>
                <iframe
                  src={previewEmbedUrl}
                  title="Stream Preview"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>
            <Check size={16} /> Save & Publish Stream Settings
          </button>
        </form>
      </div>

      {/* Passkey Management Center */}
      <div className="upload-section-card" style={{ padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Key size={20} className="gold-text" />
          <h3 className="headline-sm" style={{ margin: 0 }}>Foreign / VIP Access Passkey Manager</h3>
        </div>

        <form onSubmit={handleGeneratePasskey} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="admin-input"
            placeholder="Label / Recipient (e.g. Royal Delegation Pass, VIP Guest)"
            value={passkeyLabel}
            onChange={(e) => setPasskeyLabel(e.target.value)}
            style={{ flex: 1, minWidth: '220px' }}
          />
          <button type="submit" className="btn btn-gold" style={{ gap: '0.4rem' }}>
            <Plus size={16} /> Generate 1-Click Passkey
          </button>
        </form>

        <h4 className="headline-xs" style={{ marginBottom: '0.75rem' }}>Active Passkeys ({passkeys.length})</h4>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {passkeys.map((p) => (
            <div
              key={p.code}
              style={{
                background: 'var(--surface-bright)',
                border: '1px solid var(--border-bronze-subtle)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '1px' }}>
                  {p.code}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
                  {p.label} &middot; Generated: {p.createdAt}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleCopyPasskey(p.code)}
                  style={{ padding: '0.35rem 0.65rem', fontSize: '12px', gap: '0.3rem' }}
                >
                  {copiedCode === p.code ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  {copiedCode === p.code ? 'Copied' : 'Copy'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleDeletePasskey(p.code)}
                  style={{ padding: '0.35rem 0.65rem', fontSize: '12px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                  title="Revoke Passkey"
                >
                  <Trash2 size={14} /> Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
