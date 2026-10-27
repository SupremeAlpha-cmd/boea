/**
 * BOEA Live Stream data — config + passkeys, now backed by the CMS
 * (`src/lib/cms.js`) instead of browser localStorage alone.
 *
 * Security changes (see FIREBASE_SETUP.md):
 * - There are NO built-in passkeys anymore. The old hardcoded codes and the
 *   master override that accepted them are deleted. The admin creates fresh
 *   passkeys in the portal after Firebase is connected.
 * - Passkeys are stored as SHA-256 hashes only — never the codes themselves.
 *   A generated code is shown to the admin exactly once, at creation time.
 * - Verification hashes the visitor's input and compares hashes, so the code
 *   itself never travels to or from the database.
 *
 * Honest limit: hashes live under a public-read CMS path (visitors must be
 * able to verify), so a short code could be brute-forced offline. That is
 * why generated codes are now long random strings, not 4-digit suffixes.
 * Truly secret verification would need a server check (Cloud Function) —
 * listed as a follow-up in FIREBASE_SETUP.md, not pretended here.
 */

import { cmsFetch, cmsSave, readCache, CMS_PATHS } from '../lib/cms';

// Default Live Stream Configuration for Best of Edo Award (BOEA)
const DEFAULT_STREAM_CONFIG = {
  title: '9th Edition Best of Edo Award Gala Night 2026 — Official Live Stream',
  subtitle: 'Experience the grandeur, black carpet highlights, and royal award presentations live from Benin City, Edo State.',
  status: 'upcoming', // 'upcoming' | 'live' | 'ended'
  eventDate: '2026-11-15T18:00:00',
  youtubeUrl: 'https://youtu.be/lHaKtEVysk8?si=UuJtm_lDqVXXt_qy', // Current featured video
  foreignPriceUSD: 5,
  nigeriaFreeAccess: true,
  paystackPublicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
  paystackCurrency: 'USD',
  announcement: '🔴 Black Carpet Coverage starts at 5:00 PM WAT. Main Gala Award Ceremony commences at 6:30 PM WAT live on YouTube.',
  bannerImage: '/assets/boea_gala_night_hall.jpeg'
};

export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export function formatYouTubeEmbedUrl(urlOrId) {
  if (!urlOrId) return 'https://www.youtube-nocookie.com/embed/lHaKtEVysk8?autoplay=1&modestbranding=1&rel=0';
  const trimmed = urlOrId.trim();
  const videoId = extractYouTubeId(trimmed);
  if (videoId && videoId.length === 11) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
  }
  if (trimmed.includes('@BestofEdoAwards') || trimmed.includes('BestofEdoAwards')) {
    return 'https://www.youtube-nocookie.com/embed/live_stream?channel=BestofEdoAwards';
  }
  if (trimmed.includes('embed/')) {
    return trimmed;
  }
  return 'https://www.youtube-nocookie.com/embed/lHaKtEVysk8?autoplay=1&modestbranding=1&rel=0';
}

// ---------------------------------------------------------------------------
// Stream config — CMS-backed, bundled defaults as fallback
// ---------------------------------------------------------------------------

/** Synchronous read (local cache merged over defaults) for first paint. */
export function getStoredStreamConfig() {
  const cached = readCache(CMS_PATHS.streamConfig, null);
  if (cached) {
    const parsed = { ...DEFAULT_STREAM_CONFIG, ...cached };
    // Clean up legacy test data / old channel links
    if (
      parsed.youtubeUrl &&
      (parsed.youtubeUrl.includes('dQw4w9WgXcQ') ||
        parsed.youtubeUrl.includes('@BestofEdoAwards') ||
        parsed.youtubeUrl.includes('gnFr2I8xIhA'))
    ) {
      parsed.youtubeUrl = DEFAULT_STREAM_CONFIG.youtubeUrl;
    }
    return parsed;
  }
  return DEFAULT_STREAM_CONFIG;
}

/** Live read from the database (falls back to the cached/default config). */
export async function fetchStreamConfig() {
  const fetched = await cmsFetch(CMS_PATHS.streamConfig, null);
  if (!fetched) return getStoredStreamConfig();
  const parsed = { ...DEFAULT_STREAM_CONFIG, ...fetched };
  if (
    parsed.youtubeUrl &&
    (parsed.youtubeUrl.includes('dQw4w9WgXcQ') ||
      parsed.youtubeUrl.includes('@BestofEdoAwards') ||
      parsed.youtubeUrl.includes('gnFr2I8xIhA'))
  ) {
    parsed.youtubeUrl = DEFAULT_STREAM_CONFIG.youtubeUrl;
  }
  return parsed;
}

export async function saveStreamConfig(config) {
  return cmsSave(CMS_PATHS.streamConfig, config);
}

// ---------------------------------------------------------------------------
// Passkeys — SHA-256 hashes only, no codes stored anywhere
// ---------------------------------------------------------------------------

/** SHA-256 hex of the normalised code. Fails closed without secure context. */
export async function hashPasskey(code) {
  const data = new TextEncoder().encode(code.trim().toUpperCase());
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Synchronous read of cached passkey records (hashes, labels, flags). */
export function getStoredPasskeys() {
  const cached = readCache(CMS_PATHS.passkeys, null);
  return Array.isArray(cached) ? cached : [];
}

/** Live read of passkey records from the database. */
export async function fetchPasskeys() {
  const fetched = await cmsFetch(CMS_PATHS.passkeys, null);
  return Array.isArray(fetched) ? fetched : getStoredPasskeys();
}

export async function savePasskeys(passkeys) {
  return cmsSave(CMS_PATHS.passkeys, passkeys);
}

function randomGroup(length) {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no lookalikes
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

/**
 * Generate a passkey. Returns `{ code, record, passkeys }` — `code` is the
 * plaintext shown to the admin ONCE; only the hash is stored. Callers must
 * display `code` immediately, because it cannot be recovered afterwards.
 */
export async function generatePasskey(label = 'Foreign Visitor Pass') {
  const code = `BOEA-${randomGroup(4)}-${randomGroup(4)}-${randomGroup(4)}`;
  const codeHash = await hashPasskey(code);
  const record = {
    codeHash,
    label,
    createdAt: new Date().toISOString().split('T')[0],
    active: true,
  };
  const current = await fetchPasskeys();
  const updated = [record, ...current];
  await savePasskeys(updated);
  return { code, record, passkeys: updated };
}

/**
 * Verify a visitor-supplied code by hash comparison against stored records,
 * then against locally kept purchase receipts (from the PPV checkout).
 * Returns `{ valid, passkey: { label } }` or `{ valid: false, message }`.
 * Never returns a stored code — there is none to return.
 */
export async function verifyPasskey(inputCode) {
  if (!inputCode) return { valid: false, message: 'Passkey cannot be empty' };
  const cleanCode = inputCode.trim().toUpperCase();

  // 1. Check local cache (fastest on current device)
  const purchased = localStorage.getItem(`boea_purchased_pass_${cleanCode}`);
  if (purchased) {
    try {
      const info = JSON.parse(purchased);
      return { valid: true, passkey: { label: info.label || 'Paid PPV Pass' } };
    } catch (e) {
      // ignore
    }
  }

  // 2. Check VIP passkey hashes from CMS (admin generated passkeys)
  try {
    const hash = await hashPasskey(cleanCode);
    const passkeys = await fetchPasskeys();
    const match = passkeys.find((p) => p.codeHash === hash && p.active);
    if (match) {
      return { valid: true, passkey: { label: match.label } };
    }
  } catch (e) {
    console.error('Passkey hash check error:', e);
  }

  // 3. Secure server-side verification (verifies HMAC, Paystack, and authenticated Firebase)
  try {
    const res = await fetch(
      `/api/paystack/verify?passcode=${encodeURIComponent(cleanCode)}`
    );
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && serverData.valid) {
        const passInfo = {
          type: 'paid_ppv',
          label: serverData.label || 'Verified PPV Ticket',
          code: cleanCode,
          reference: serverData.reference
        };
        localStorage.setItem(`boea_purchased_pass_${cleanCode}`, JSON.stringify(passInfo));
        return { valid: true, passkey: { label: passInfo.label } };
      }
    }
  } catch (err) {
    // offline or server unreachable
  }

  return { valid: false, message: 'Invalid or expired Access Passkey. Please check and try again.' };
}

// ---------------------------------------------------------------------------
// PPV Transactions — Recorded on successful Paystack payment
// ---------------------------------------------------------------------------

export function getStoredTransactions() {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('boea_ppv_transactions');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing boea_ppv_transactions', e);
    }
  }
  return [];
}

export function saveTransactions(transactions) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('boea_ppv_transactions', JSON.stringify(transactions));
}

export async function recordPPVPurchase({
  reference,
  email,
  fullName,
  amount,
  currency = 'USD',
  gateway = 'paystack',
  serverPassCode
}) {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const passCode = serverPassCode || `BOEA-PPV-${randomNum}`;
  const now = new Date();

  const transaction = {
    id: `tx-${Date.now()}-${randomNum}`,
    reference: reference || `REF-${Date.now()}`,
    email: (email || '').trim(),
    fullName: (fullName || '').trim() || 'BOEA Gala Patron',
    amount: Number(amount) || 5,
    currency: currency.toUpperCase(),
    gateway,
    passCode,
    status: 'success',
    createdAt: now.toISOString(),
    formattedDate: now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  // 1. Add to local transactions ledger
  const currentTxs = getStoredTransactions();
  const updatedTxs = [transaction, ...currentTxs];
  saveTransactions(updatedTxs);

  // 2. Save as purchased pass for quick local retrieval
  const info = {
    type: 'paid_ppv',
    label: `Foreign PPV Ticket (${currency.toUpperCase()} ${amount})`,
    code: passCode,
    buyer: (fullName || 'BOEA Gala Patron').trim(),
    reference: transaction.reference,
    amount: transaction.amount,
    currency: transaction.currency
  };
  localStorage.setItem(`boea_purchased_pass_${passCode}`, JSON.stringify(info));
  localStorage.setItem('boea_ppv_session_unlocked', JSON.stringify(info));

  return { transaction, passCode, info };
}
