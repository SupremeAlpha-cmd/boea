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
// Tracking — call once per pageview (route change)
// ---------------------------------------------------------------------------

/**
 * Log a pageview. Fire-and-forget — never blocks rendering,
 * never throws if Firebase is down or unconfigured.
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

    push(ref(database, 'pageviews'), {
      path: path || window.location.pathname,
      referrer: document.referrer || null,
      vid,
      ua: (navigator.userAgent || '').slice(0, 120),
      ts: Date.now(),
    }).catch(() => {});
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
 * Aggregate stats from raw pageviews — pure function, easy to test.
 */
export function computeStats(views) {
  const vids = new Set();
  const pageCounts = new Map();
  const refCounts = new Map();
  const dayCounts = new Map();

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
  }

  const topEntries = (m, n) =>
    Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([key, views]) => ({ key, views }));

  return {
    totalViews: views.length,
    uniqueVisitors: vids.size,
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

