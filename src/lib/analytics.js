/**
 * BOEA Analytics — Firebase-backed pageview tracking.
 *
 * Setup (Javin):
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Enable Realtime Database (start in test mode, then lock down rules)
 * 3. Copy your web app config into `.env` (see `.env.example`)
 * 4. Deploy — tracking starts automatically, dashboard appears in Admin
 *
 * Until Firebase is configured, all functions no-op gracefully.
 * The site works fine without it.
 */

import { ref, push, get, query, orderByChild, limitToLast } from 'firebase/database';
import { getDb, isDatabaseConfigured } from './firebase';

// ---------------------------------------------------------------------------
// Config — from Vite env vars via the shared Firebase init (`./firebase.js`).
// Empty until Firebase is wired up.
// ---------------------------------------------------------------------------

export const isAnalyticsEnabled = isDatabaseConfigured;

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Geolocation Helper — Non-invasive country detection with session caching
// ---------------------------------------------------------------------------

export async function detectVisitorCountry() {
  if (typeof window === 'undefined') return 'UNKNOWN';
  const cached = sessionStorage.getItem('boea-country');
  if (cached) return cached;

  try {
    const res = await fetch('https://api.country.is');
    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        const code = String(data.country).toUpperCase();
        sessionStorage.setItem('boea-country', code);
        return code;
      }
    }
  } catch {}

  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        const code = String(data.country_code).toUpperCase();
        sessionStorage.setItem('boea-country', code);
        return code;
      }
    }
  } catch {}

  // Timezone heuristic if network APIs fail
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Lagos')) {
      sessionStorage.setItem('boea-country', 'NG');
      return 'NG';
    }
  } catch {}

  return 'UNKNOWN';
}

export function getCountryFlag(code) {
  if (!code || code === 'UNKNOWN' || code.length !== 2) return '🌐';
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

export function getCountryName(code) {
  if (!code || code === 'UNKNOWN') return 'Global / Unspecified';
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return displayNames.of(code.toUpperCase()) || code;
  } catch {
    const common = {
      NG: 'Nigeria',
      US: 'United States',
      GB: 'United Kingdom',
      CA: 'Canada',
      DE: 'Germany',
      GH: 'Ghana',
      ZA: 'South Africa',
      IE: 'Ireland',
      IT: 'Italy',
      FR: 'France'
    };
    return common[code.toUpperCase()] || code;
  }
}

// ---------------------------------------------------------------------------
// Tracking — call once per pageview (route change)
// ---------------------------------------------------------------------------

/**
 * Log a pageview with visitor geolocation. Fire-and-forget — never blocks rendering.
 */
export function trackPageView(path) {
  try {
    const database = getDb();
    if (!database) return;

    // Lightweight visitor id (per-browser, no PII)
    let vid = sessionStorage.getItem('boea-vid');
    if (!vid) {
      vid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('boea-vid', vid);
    }

    const cachedCountry = sessionStorage.getItem('boea-country');

    const sendHit = (countryCode) => {
      push(ref(database, 'pageviews'), {
        path: path || window.location.pathname,
        referrer: document.referrer || null,
        vid,
        country: countryCode || 'UNKNOWN',
        ua: (navigator.userAgent || '').slice(0, 120),
        ts: Date.now(),
      }).catch(() => {});
    };

    if (cachedCountry) {
      sendHit(cachedCountry);
    } else {
      detectVisitorCountry().then((c) => sendHit(c));
    }
  } catch {
    // Analytics must never break the site
  }
}

// ---------------------------------------------------------------------------
// Dashboard queries — for the Admin Analytics tab
// ---------------------------------------------------------------------------

/**
 * Fetch recent pageviews (last N). Returns [] if unconfigured.
 */
export async function getRecentPageViews(limit = 5000) {
  const database = getDb();
  if (!database) return [];
  try {
    const snap = await get(
      query(ref(database, 'pageviews'), orderByChild('ts'), limitToLast(limit)),
    );
    const out = [];
    snap.forEach((child) => {
      out.push(child.val());
    });
    return out.sort((a, b) => b.ts - a.ts);
  } catch {
    return [];
  }
}

/**
 * Aggregate stats from raw pageviews including geographic breakdown.
 */
export function computeStats(views) {
  const vids = new Set();
  const pageCounts = new Map();
  const refCounts = new Map();
  const dayCounts = new Map();
  const countryVisitors = new Map();
  const countryViews = new Map();

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayVids = new Set();
  let todayViewsCount = 0;

  for (const v of views) {
    vids.add(v.vid);
    pageCounts.set(v.path, (pageCounts.get(v.path) || 0) + 1);

    if (v.referrer) {
      try {
        const host = new URL(v.referrer).hostname;
        refCounts.set(host, (refCounts.get(host) || 0) + 1);
      } catch {
        // ignore malformed referrers
      }
    }

    const day = new Date(v.ts).toISOString().slice(0, 10);
    dayCounts.set(day, (dayCounts.get(day) || 0) + 1);

    if (day === todayStr) {
      todayViewsCount++;
      todayVids.add(v.vid);
    }

    // Geographic tracking (by country code)
    const country = (v.country || 'UNKNOWN').toUpperCase();
    if (!countryVisitors.has(country)) {
      countryVisitors.set(country, new Set());
    }
    countryVisitors.get(country).add(v.vid);
    countryViews.set(country, (countryViews.get(country) || 0) + 1);
  }

  const totalUnique = vids.size;

  // Compile country breakdown
  const countriesList = Array.from(countryVisitors.entries())
    .map(([code, vidSet]) => ({
      code,
      name: getCountryName(code),
      flag: getCountryFlag(code),
      visitors: vidSet.size,
      views: countryViews.get(code) || 0,
      percentage: totalUnique > 0 ? Math.round((vidSet.size / totalUnique) * 100) : 0
    }))
    .sort((a, b) => b.visitors - a.visitors);

  const nigeriaEntry = countriesList.find((c) => c.code === 'NG');
  const nigeriaVisitors = nigeriaEntry ? nigeriaEntry.visitors : 0;
  const diasporaVisitors = Math.max(0, totalUnique - nigeriaVisitors);
  const nigeriaPercent = totalUnique > 0 ? Math.round((nigeriaVisitors / totalUnique) * 100) : 0;
  const diasporaPercent = totalUnique > 0 ? 100 - nigeriaPercent : 0;

  const topEntries = (m, n) =>
    Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([key, views]) => ({ key, views }));

  return {
    totalViews: views.length,
    uniqueVisitors: totalUnique,
    todayViews: todayViewsCount,
    todayVisitors: todayVids.size,
    geographic: {
      countries: countriesList,
      topCountries: countriesList.slice(0, 10),
      nigeriaVisitors,
      diasporaVisitors,
      nigeriaPercent,
      diasporaPercent
    },
    topPages: topEntries(pageCounts, 10).map(({ key, views }) => ({
      path: key,
      views,
    })),
    topReferrers: topEntries(refCounts, 10).map(({ key, views }) => ({
      referrer: key,
      views,
    })),
    dailyViews: Array.from(dayCounts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14)
      .map(([date, views]) => ({ date, views })),
  };
}

// ---------------------------------------------------------------------------
// PPV Purchase Tracking — Logged to Firebase Realtime Database
// ---------------------------------------------------------------------------

/**
 * Log a PPV Purchase event to Firebase Realtime Database.
 * Fire-and-forget — never blocks or fails client flow.
 */
export function trackPPVPurchase(purchase) {
  try {
    const database = getDb();
    if (!database) return;

    push(ref(database, 'ppv_purchases'), {
      reference: purchase.reference || null,
      email: purchase.email || 'anonymous',
      fullName: purchase.fullName || 'Patron',
      amount: Number(purchase.amount) || 5,
      currency: (purchase.currency || 'USD').toUpperCase(),
      gateway: purchase.gateway || 'paystack',
      ts: Date.now(),
      date: new Date().toISOString()
    }).catch(() => {});
  } catch {
    // Non-blocking
  }
}

/**
 * Fetch recent PPV purchases from Firebase for Admin Analytics.
 */
export async function getRecentPPVPurchases(limit = 1000) {
  const database = getDb();
  if (!database) return [];
  try {
    const snap = await get(
      query(ref(database, 'ppv_purchases'), orderByChild('ts'), limitToLast(limit))
    );
    const out = [];
    snap.forEach((child) => {
      out.push({ id: child.key, ...child.val() });
    });
    return out.sort((a, b) => b.ts - a.ts);
  } catch {
    return [];
  }
}

/**
 * Compute revenue and ticket statistics for PPV purchases.
 */
export function computePPVStats(purchases = []) {
  let totalRevenueUSD = 0;
  let totalRevenueNGN = 0;
  const buyerEmails = new Set();

  for (const p of purchases) {
    if (p.currency === 'USD') {
      totalRevenueUSD += Number(p.amount) || 0;
    } else if (p.currency === 'NGN') {
      totalRevenueNGN += Number(p.amount) || 0;
    } else {
      totalRevenueUSD += Number(p.amount) || 0;
    }
    if (p.email) buyerEmails.add(p.email.toLowerCase());
  }

  return {
    totalTickets: purchases.length,
    uniqueBuyers: buyerEmails.size,
    totalRevenueUSD,
    totalRevenueNGN,
    recentPurchases: purchases.slice(0, 10)
  };
}

