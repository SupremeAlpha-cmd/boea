import { useState, useEffect } from 'react';
import {
  Play,
  Globe,
  CheckCircle,
  Key,
  ShieldCheck,
  Clock,
  ExternalLink,
  Sparkles,
  CreditCard,
  X,
  Tv,
  RefreshCw,
  Heart,
  ThumbsUp,
  Crown,
  Flame,
  Award
} from 'lucide-react';
import {
  getStoredStreamConfig,
  formatYouTubeEmbedUrl,
  verifyPasskey,
  extractYouTubeId
} from '../data/streamData';
import './LiveStream.css';

// IP Geolocation detector with resilient fallbacks
async function detectUserCountry() {
  try {
    const res = await fetch('https://api.country.is');
    if (res.ok) {
      const data = await res.json();
      if (data && data.country) return data.country.toUpperCase();
    }
  } catch (e) {
    // fallback to second provider
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) return data.country_code.toUpperCase();
    }
  } catch (e) {
    // ignore
  }

  return null;
}

export default function LiveStream() {
  const [config, setConfig] = useState(getStoredStreamConfig());
  const [unlocked, setUnlocked] = useState(false);
  const [activePassInfo, setActivePassInfo] = useState(null);

  // Region detection state
  const [isDetectingRegion, setIsDetectingRegion] = useState(true);
  const [isNigeria, setIsNigeria] = useState(false);

  // Verification & Payment Form States
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Payment Modal Fields
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [paidPassCode, setPaidPassCode] = useState('');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Reactions counters
  const [reactions, setReactions] = useState({
    love: 142,
    clap: 298,
    crown: 89,
    fire: 165,
    award: 210
  });

  // Run region detection & load session state
  useEffect(() => {
    const checkAccess = async () => {
      // Check existing local session unlock first
      const savedUnlock = localStorage.getItem('boea_ppv_session_unlocked');
      if (savedUnlock) {
        try {
          const parsed = JSON.parse(savedUnlock);
          setUnlocked(true);
          setActivePassInfo(parsed);
        } catch (e) {
          // ignore
        }
      }

      // Run IP Geolocation detection
      const country = await detectUserCountry();
      if (country === 'NG') {
        setIsNigeria(true);
      } else {
        setIsNigeria(false);
      }
      setIsDetectingRegion(false);
    };

    checkAccess();
    setConfig(getStoredStreamConfig());
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(config.eventDate || '2026-11-15T18:00:00').getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.eventDate]);

  // Handle Passkey Verification
  const handleVerifyPasskey = (e) => {
    e.preventDefault();
    setPasskeyError('');
    const res = verifyPasskey(passkeyInput);
    if (res.valid) {
      const info = {
        type: 'passkey',
        label: res.passkey.label || 'VIP Pass Verified',
        code: res.passkey.code
      };
      setUnlocked(true);
      setActivePassInfo(info);
      localStorage.setItem('boea_ppv_session_unlocked', JSON.stringify(info));
      setPasskeyInput('');
    } else {
      setPasskeyError(res.message);
    }
  };

  // Handle Nigerian Free Stream Access
  const handleNigeriaFreeUnlock = (e) => {
    e.preventDefault();
    const info = {
      type: 'nigeria_free',
      label: 'Free Nigerian Viewer Access 🇳🇬',
      code: 'BOEA-NG-FREE'
    };
    setUnlocked(true);
    setActivePassInfo(info);
    localStorage.setItem('boea_ppv_session_unlocked', JSON.stringify(info));
  };

  // Handle Online Foreign Payment Simulation ($5 USD)
  const handleCompletePayment = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerEmail.trim()) return;

    setIsProcessingPay(true);
    setTimeout(() => {
      const generatedCode = `BOEA-PPV-${Math.floor(10000 + Math.random() * 90000)}`;
      const info = {
        type: 'paid_usd',
        label: `Foreign PPV Ticket ($${config.foreignPriceUSD} USD)`,
        code: generatedCode,
        buyer: buyerName
      };

      // Save locally
      localStorage.setItem(`boea_purchased_pass_${generatedCode}`, JSON.stringify(info));
      localStorage.setItem('boea_ppv_session_unlocked', JSON.stringify(info));

      setPaidPassCode(generatedCode);
      setIsProcessingPay(false);
      setUnlocked(true);
      setActivePassInfo(info);
    }, 1500);
  };

  const handleLockSession = () => {
    localStorage.removeItem('boea_ppv_session_unlocked');
    setUnlocked(false);
    setActivePassInfo(null);
    setPaidPassCode('');
  };

  const handleTriggerReaction = (key) => {
    setReactions((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const youtubeEmbed = formatYouTubeEmbedUrl(config.youtubeUrl);
  const rawVideoId = extractYouTubeId(config.youtubeUrl);

  return (
    <div className="livestream-page container">
      {/* Broadcast Header & Hero */}
      <section className="livestream-hero">
        <div className={`live-status-badge ${config.status}`}>
          <span className="pulse-dot"></span>
          {config.status === 'live'
            ? '🔴 LIVE BROADCAST ON YOUTUBE'
            : config.status === 'upcoming'
            ? '⏰ UPCOMING EVENT BROADCAST'
            : '⏹️ BROADCAST CONCLUDED'}
        </div>

        <h1 className="livestream-title">{config.title}</h1>
        <p className="livestream-subtitle">{config.subtitle}</p>

        {/* Live Announcement Ticker */}
        {config.announcement && (
          <div className="livestream-ticker">
            <Sparkles size={16} />
            <span>{config.announcement}</span>
          </div>
        )}

        {/* Gala Countdown Grid */}
        <div className="countdown-grid">
          <div className="countdown-card">
            <div className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
      </section>

      {/* Main Player OR Automatic Region Intercept Paywall Gate */}
      {unlocked ? (
        <section className="stream-player-container">
          {/* Active Pass Badge / Switch */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', background: 'var(--surface-bright)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-bronze-subtle)', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '13px' }}>
              <ShieldCheck size={18} className="gold-text" />
              <span style={{ fontWeight: 600 }}>{activePassInfo?.label || 'Access Pass Active'}</span>
              <span className="label-caps text-muted" style={{ fontSize: '11px' }}>({activePassInfo?.code})</span>
            </div>
            <button
              type="button"
              onClick={handleLockSession}
              className="btn btn-outline"
              style={{ padding: '0.3rem 0.75rem', fontSize: '12px' }}
            >
              Lock / Change Passkey
            </button>
          </div>

          {/* YouTube Video Player Embed */}
          <div className="stream-player-wrapper">
            <iframe
              src={youtubeEmbed}
              title={config.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          {/* Player Actions & Live Reactions Bar */}
          <div className="stream-reactions-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="label-caps gold-text" style={{ fontSize: '12px' }}>Live Event Reactions:</span>
              <div className="reaction-buttons-group">
                <button type="button" className="reaction-btn" onClick={() => handleTriggerReaction('love')}>
                  <Heart size={16} fill="#ef4444" color="#ef4444" /> {reactions.love}
                </button>
                <button type="button" className="reaction-btn" onClick={() => handleTriggerReaction('clap')}>
                  <ThumbsUp size={16} className="gold-text" /> {reactions.clap}
                </button>
                <button type="button" className="reaction-btn" onClick={() => handleTriggerReaction('crown')}>
                  <Crown size={16} color="#eab308" /> {reactions.crown}
                </button>
                <button type="button" className="reaction-btn" onClick={() => handleTriggerReaction('fire')}>
                  <Flame size={16} color="#f97316" /> {reactions.fire}
                </button>
                <button type="button" className="reaction-btn" onClick={() => handleTriggerReaction('award')}>
                  <Award size={16} className="gold-text" /> {reactions.award}
                </button>
              </div>
            </div>

            <a
              href={rawVideoId ? `https://www.youtube.com/watch?v=${rawVideoId}` : 'https://www.youtube.com/@BestofEdoAwards'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '0.4rem 0.8rem', gap: '0.4rem' }}
            >
              <ExternalLink size={14} /> Watch on YouTube
            </a>
          </div>

          {/* Gala Event Program Schedule */}
          <div className="program-timeline-card">
            <h3 className="headline-sm gold-text" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} /> Gala Night Live Broadcast Schedule
            </h3>
            <div className="timeline-items">
              <div className="timeline-item">
                <div className="timeline-time">5:00 PM WAT</div>
                <div>
                  <div className="timeline-title">Black Carpet Arrival & Celebrity Spotlights</div>
                  <div className="timeline-desc">Live arrivals of royal delegates, nominees, corporate sponsors, and cultural icons.</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">6:00 PM WAT</div>
                <div>
                  <div className="timeline-title">Grand Entry of Dignitaries & Cultural Troupe</div>
                  <div className="timeline-desc">Royal Benin cultural dances, brass band processional, and VIP seating.</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">6:30 PM WAT</div>
                <div>
                  <div className="timeline-title">National Anthem & Opening Keynote Address</div>
                  <div className="timeline-desc">Welcome remarks by the Founder & Chairman of the Advisory Board.</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">7:15 PM WAT</div>
                <div>
                  <div className="timeline-title">Official Laureate Award Presentations</div>
                  <div className="timeline-desc">Conferment of prestigious plaques and honors across humanitarian, civic, and business categories.</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">9:30 PM WAT</div>
                <div>
                  <div className="timeline-title">Celebratory Dinner & Musical Finale</div>
                  <div className="timeline-desc">Closing remarks, royal toast, and live musical performances.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : isDetectingRegion ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <RefreshCw size={28} className="spin-icon gold-text" style={{ margin: '0 auto 1rem auto' }} />
          <div className="label-caps gold-text">Detecting Regional Access Rights...</div>
        </div>
      ) : isNigeria ? (
        /* Nigerian Viewers Free Access Card (Auto-Intercepted via IP) */
        <section className="region-gate-container">
          <div className="paywall-card">
            <span className="label-caps gold-text">🇳🇬 Nigeria Live Broadcast</span>
            <h2 className="headline-md" style={{ margin: '0.5rem 0' }}>Free Live Stream Access</h2>
            <p className="body-md text-muted" style={{ maxWidth: '550px', margin: '0 auto 1.5rem auto' }}>
              Your IP location indicates viewing from Nigeria. Enjoy free live access to the 9th Edition Best of Edo Award Gala Night ceremony.
            </p>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} /> Free Access Granted — Courtesy of Walkfront African Network
            </div>

            <form onSubmit={handleNigeriaFreeUnlock} style={{ maxWidth: '400px', margin: '0 auto' }}>
              <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem' }}>
                <Play size={18} /> Start Watching YouTube Stream 🇳🇬
              </button>
            </form>
          </div>
        </section>
      ) : (
        /* Foreign Viewer PPV Paywall (Auto-Intercepted via IP) */
        <section className="region-gate-container">
          <div className="paywall-card">
            <span className="label-caps gold-text">Official Gala Night Stream Pass</span>
            <h2 className="headline-md" style={{ margin: '0.5rem 0' }}>International Pay-Per-View Access</h2>
            <p className="body-md text-muted" style={{ maxWidth: '550px', margin: '0 auto' }}>
              Join the grand celebration live from anywhere in the world! Foreign viewers require an All-Access Pass or VIP ticket code to watch the YouTube Live HD stream.
            </p>

            <div className="paywall-price-badge">${config.foreignPriceUSD} USD</div>

            <ul className="paywall-features-list">
              <li className="paywall-feature-item">
                <CheckCircle size={18} className="gold-text" /> 1080p High-Definition YouTube Live Stream
              </li>
              <li className="paywall-feature-item">
                <CheckCircle size={18} className="gold-text" /> Full Black Carpet & Main Award Ceremony Coverage
              </li>
              <li className="paywall-feature-item">
                <CheckCircle size={18} className="gold-text" /> Instant Replay Access & On-Demand Highlights
              </li>
              <li className="paywall-feature-item">
                <CheckCircle size={18} className="gold-text" /> Interactive Live Event Reactions & Chat
              </li>
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              <button
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem' }}
              >
                <CreditCard size={18} /> Buy Instant PPV Ticket (${config.foreignPriceUSD} USD)
              </button>
            </div>

            {/* Passkey Entry for VIP Ticket Holders */}
            <div className="passkey-form">
              <span className="label-caps gold-text" style={{ fontSize: '11px' }}>Have a VIP Ticket Passkey?</span>
              <p className="body-sm text-muted" style={{ margin: '0.2rem 0 0.75rem 0' }}>
                If you received an access passcode from the organizers, enter it below to unlock the stream.
              </p>

              <form onSubmit={handleVerifyPasskey}>
                <div className="passkey-input-group">
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="SECRET-KEY"
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    required
                    style={{ textTransform: 'uppercase' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    <Key size={16} /> Unlock
                  </button>
                </div>
                {passkeyError && (
                  <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '0.5rem', fontWeight: 600 }}>
                    {passkeyError}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Online Payment Modal ($5 USD) */}
      {showPaymentModal && (
        <div className="ppv-modal-overlay">
          <div className="ppv-modal-card">
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--on-surface-variant)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            {paidPassCode ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                <h3 className="headline-sm gold-text" style={{ margin: 0 }}>Payment Confirmed!</h3>
                <p className="body-sm text-muted" style={{ margin: '0.5rem 0 1.5rem 0' }}>
                  Thank you for supporting the Best of Edo Award. Your PPV Access Passkey is active:
                </p>
                <div style={{ background: 'var(--surface-bright)', border: '1px dashed var(--color-gold)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                  {paidPassCode}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Tv size={18} /> Proceed to Live Stream
                </button>
              </div>
            ) : (
              <div>
                <span className="label-caps gold-text">Secure Online Checkout</span>
                <h3 className="headline-sm" style={{ margin: '0.25rem 0 1rem 0' }}>Foreign Viewer PPV Pass</h3>

                <form onSubmit={handleCompletePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="admin-label">Full Name *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Ambassador John Smith"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-label">Email Address (for ticket receipt) *</label>
                    <input
                      type="email"
                      className="admin-input"
                      placeholder="john@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ background: 'var(--surface-bright)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-bronze-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>Gala Night Live Access</div>
                      <div style={{ fontSize: '12px', color: 'var(--secondary)' }}>YouTube 1080p HD All-Access Pass</div>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-gold)' }}>
                      ${config.foreignPriceUSD} USD
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gold"
                    disabled={isProcessingPay}
                    style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', marginTop: '0.5rem' }}
                  >
                    {isProcessingPay ? (
                      <>
                        <RefreshCw size={18} className="spin-icon" /> Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} /> Pay ${config.foreignPriceUSD} USD & Watch Live
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
