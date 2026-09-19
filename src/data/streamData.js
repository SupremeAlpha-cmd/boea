// Default Live Stream Configuration for Best of Edo Award (BOEA)
const DEFAULT_STREAM_CONFIG = {
  title: '9th Edition Best of Edo Award Gala Night 2026 — Official Live Stream',
  subtitle: 'Experience the grandeur, black carpet highlights, and royal award presentations live from Benin City, Edo State.',
  status: 'upcoming', // 'upcoming' | 'live' | 'ended'
  eventDate: '2026-11-15T18:00:00',
  youtubeUrl: 'https://youtu.be/lHaKtEVysk8?si=UuJtm_lDqVXXt_qy', // Current featured video
  foreignPriceUSD: 5,
  nigeriaFreeAccess: true,
  announcement: '🔴 Black Carpet Coverage starts at 5:00 PM WAT. Main Gala Award Ceremony commences at 6:30 PM WAT live on YouTube.',
  bannerImage: '/assets/boea_gala_night_hall.jpeg'
};

const INITIAL_PASSKEYS = [
  { code: 'SECRET-KEY', label: 'VIP Pass — Royal Guest', createdAt: '2026-09-01', active: true },
  { code: 'BOEA-VIP-2026', label: 'VIP Pass — Gala Delegate', createdAt: '2026-09-01', active: true },
  { code: 'BOEA-GALA-8849', label: 'International Press Pass', createdAt: '2026-09-05', active: true },
  { code: 'BOEA-FOREIGN-7712', label: 'Diaspora Heritage Pass', createdAt: '2026-09-10', active: true }
];

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

export function getStoredStreamConfig() {
  if (typeof window === 'undefined') return DEFAULT_STREAM_CONFIG;
  const saved = localStorage.getItem('boea_stream_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Clean up legacy test data or upgrade default channel link to the specific featured video
      if (
        parsed.youtubeUrl &&
        (parsed.youtubeUrl.includes('dQw4w9WgXcQ') ||
          parsed.youtubeUrl.includes('@BestofEdoAwards') ||
          parsed.youtubeUrl.includes('gnFr2I8xIhA'))
      ) {
        parsed.youtubeUrl = DEFAULT_STREAM_CONFIG.youtubeUrl;
        localStorage.setItem('boea_stream_config', JSON.stringify({ ...DEFAULT_STREAM_CONFIG, ...parsed }));
      }
      return { ...DEFAULT_STREAM_CONFIG, ...parsed };
    } catch (e) {
      console.error('Error parsing boea_stream_config', e);
    }
  }
  return DEFAULT_STREAM_CONFIG;
}

export function saveStreamConfig(config) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('boea_stream_config', JSON.stringify(config));
}

export function getStoredPasskeys() {
  if (typeof window === 'undefined') return INITIAL_PASSKEYS;
  const saved = localStorage.getItem('boea_stream_passkeys');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing boea_stream_passkeys', e);
    }
  }
  return INITIAL_PASSKEYS;
}

export function savePasskeys(passkeys) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('boea_stream_passkeys', JSON.stringify(passkeys));
}

export function verifyPasskey(inputCode) {
  if (!inputCode) return { valid: false, message: 'Passkey cannot be empty' };
  const cleanCode = inputCode.trim().toUpperCase();
  
  // Master override code
  if (cleanCode === 'BOEA-ADMIN-KEY' || cleanCode === 'BOEA-VIP-2026' || cleanCode === 'SECRET-KEY') {
    return { valid: true, passkey: { code: cleanCode, label: 'Master VIP Pass' } };
  }

  const passkeys = getStoredPasskeys();
  const match = passkeys.find(p => p.code.toUpperCase() === cleanCode && p.active);
  if (match) {
    return { valid: true, passkey: match };
  }

  // Check if it's a paid pass stored locally
  const purchased = localStorage.getItem(`boea_purchased_pass_${cleanCode}`);
  if (purchased) {
    return { valid: true, passkey: JSON.parse(purchased) };
  }

  return { valid: false, message: 'Invalid or expired Access Passkey. Please check and try again.' };
}

export function generatePasskey(label = 'Foreign Visitor Pass') {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const code = `BOEA-PASS-${randomNum}`;
  const newPass = {
    code,
    label,
    createdAt: new Date().toISOString().split('T')[0],
    active: true
  };

  const current = getStoredPasskeys();
  const updated = [newPass, ...current];
  savePasskeys(updated);
  return newPass;
}
