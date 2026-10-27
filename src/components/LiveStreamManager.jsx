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
  AlertCircle,
  CreditCard
} from 'lucide-react';
import {
  getStoredStreamConfig,
  fetchStreamConfig,
  saveStreamConfig,
  getStoredPasskeys,
  fetchPasskeys,
  savePasskeys,
  generatePasskey,
  extractYouTubeId,
  formatYouTubeEmbedUrl,
  getStoredTransactions
} from '../data/streamData';

export default function LiveStreamManager({ logAuditAction }) {
  const [config, setConfig] = useState(getStoredStreamConfig());
  const [passkeys, setPasskeys] = useState(getStoredPasskeys());
  const [transactions, setTransactions] = useState(getStoredTransactions());
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  // Freshly generated code — shown ONCE, right after creation. Only the
  // hash is stored, so this cannot be recovered afterwards.
  const [freshCode, setFreshCode] = useState(null);

  // Passkey generator field
  const [passkeyLabel, setPasskeyLabel] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchStreamConfig().then((c) => { if (!cancelled) setConfig(c); });
    fetchPasskeys().then((p) => { if (!cancelled) setPasskeys(p); });
    return () => { cancelled = true; };
  }, []);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    const result = await saveStreamConfig(config);
    if (logAuditAction) {
      logAuditAction('Updated Live Stream Config', `Status: ${config.status}, YouTube: ${config.youtubeUrl}`);
    }
    setSuccessMsg(
      result.cloud
        ? 'Live stream configuration updated successfully! Changes are live on the website.'
        : 'Saved on this browser only — connect Firebase to publish it to all visitors.',
    );
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleGeneratePasskey = async (e) => {
    e.preventDefault();
    const label = passkeyLabel.trim() || 'VIP Foreign Pass';
    const { code, passkeys: updated } = await generatePasskey(label);
    setPasskeys(updated);
    setFreshCode({ code, label });
    setPasskeyLabel('');
    if (logAuditAction) {
      // Audit trail records the label only — never the code itself.
      logAuditAction('Generated Stream Passkey', `Label: ${label}`);
    }
  };

  const handleDeletePasskey = async (codeHash) => {
    const removed = passkeys.find((p) => p.codeHash === codeHash);
    const updated = passkeys.filter((p) => p.codeHash !== codeHash);
    setPasskeys(updated);
    await savePasskeys(updated);
    if (logAuditAction) {
      logAuditAction('Revoked Stream Passkey', `Label: ${removed?.label || 'unknown'}`);
    }
  };

  const handleCopyFreshCode = () => {
    if (!freshCode) return;
    navigator.clipboard.writeText(freshCode.code);
    setCopiedCode(freshCode.code);
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
                placeholder="e.g. Black Carpet starts at 5:00 PM..."
                value={config.announcement}
                onChange={(e) => setConfig({ ...config, announcement: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-grid-2">
            <div>
              <label className="admin-label">Paystack Public Key (for PPV Checkout)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="pk_live_... or pk_test_..."
                value={config.paystackPublicKey || ''}
                onChange={(e) => setConfig({ ...config, paystackPublicKey: e.target.value })}
              />
              <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '0.25rem', display: 'block' }}>
                Found in your Paystack Dashboard &rarr; Settings &rarr; API Keys.
              </span>
            </div>

            <div>
              <label className="admin-label">Checkout Currency</label>
              <select
                className="admin-input admin-select"
                value={config.paystackCurrency || 'USD'}
                onChange={(e) => setConfig({ ...config, paystackCurrency: e.target.value })}
              >
                <option value="USD">USD ($)</option>
                <option value="NGN">NGN (₦)</option>
              </select>
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

        {freshCode && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', marginBottom: '0.25rem' }}>
              New passkey for “{freshCode.label}” — copy it now, it cannot be shown again:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <code style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '1px', color: 'var(--color-gold)' }}>{freshCode.code}</code>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCopyFreshCode}
                style={{ padding: '0.35rem 0.65rem', fontSize: '12px', gap: '0.3rem' }}
              >
                {copiedCode === freshCode.code ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                {copiedCode === freshCode.code ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setFreshCode(null)}
                style={{ padding: '0.35rem 0.65rem', fontSize: '12px' }}
              >
                Done
              </button>
            </div>
          </div>
        )}

        <h4 className="headline-xs" style={{ marginBottom: '0.75rem' }}>Active Passkeys ({passkeys.length})</h4>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {passkeys.length === 0 && (
            <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
              No passkeys yet. Generate one above — old built-in codes were removed with the Firebase migration and will not work.
            </p>
          )}
          {passkeys.map((p) => (
            <div
              key={p.codeHash}
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
                  {p.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
                  Code stored as a hash (not shown) &middot; Generated: {p.createdAt} &middot; {p.active ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleDeletePasskey(p.codeHash)}
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

      {/* PPV Transactions Ledger */}
      <div className="upload-section-card" style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border-bronze-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={20} className="gold-text" />
            <h3 className="headline-sm" style={{ margin: 0 }}>PPV Live Stream Transactions</h3>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '13px' }}>
            <span><strong>Total Orders:</strong> {transactions.length}</span>
            <span>
              <strong>Total Volume:</strong> $
              {transactions
                .filter((t) => t.currency === 'USD')
                .reduce((acc, t) => acc + (Number(t.amount) || 0), 0)
                .toLocaleString()}{' '}
              USD
            </span>
          </div>
        </div>

        {transactions.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
            No online PPV ticket purchases recorded yet. Foreign viewer purchases via Paystack will appear here automatically.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {transactions.slice(0, 15).map((tx) => (
              <div
                key={tx.id}
                style={{
                  background: 'var(--surface-bright)',
                  border: '1px solid var(--border-bronze-subtle)',
                  borderRadius: '8px',
                  padding: '0.85rem 1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                    {tx.fullName} &middot; <span style={{ color: 'var(--on-surface-variant)', fontWeight: 400 }}>{tx.email}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '0.15rem' }}>
                    Ref: <code>{tx.reference}</code> &middot; Passkey: <code style={{ color: 'var(--color-gold)' }}>{tx.passCode}</code> &middot; {tx.formattedDate || tx.createdAt}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-gold)' }}>
                    ${tx.amount} {tx.currency}
                  </div>
                  <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                    Paid ({tx.gateway || 'Paystack'})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
