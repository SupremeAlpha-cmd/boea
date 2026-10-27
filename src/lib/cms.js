/**
 * BOEA CMS — Realtime Database-backed content with a local cache fallback.
 *
 * Admin-managed collections live under `cms/*` in the database so an edit in
 * the admin portal reaches every visitor, not just the admin's own browser
 * (the old localStorage-only behaviour). Public pages read through here and
 * fall back to bundled defaults + the last cached copy when Firebase is
 * unconfigured or unreachable, so the site never breaks on a backend outage.
 *
 * Writes always update the local cache first, then attempt the database.
 * Callers get `{ ok, cloud }` back so the admin UI can say plainly when a
 * change saved locally only (Firebase unconfigured, or a failed write such as
 * an oversized base64 image).
 *
 * Security: see `database.rules.json` — `cms/*` is public-read, admin-write.
 * Passkey *codes* are never stored here, only their SHA-256 hashes
 * (see `streamData.js`).
 */

import { ref, get, set, onValue } from 'firebase/database';
import { getDb } from './firebase';

export const CMS_PATHS = {
  sponsors: 'cms/sponsors',
  galleryPhotos: 'cms/gallery/photos',
  galleryVideos: 'cms/gallery/videos',
  blog: 'cms/blog',
  recipients: 'cms/recipients',
  streamConfig: 'cms/stream/config',
  passkeys: 'cms/stream/passkeys',
  auditLogs: 'admin/auditLogs',
};

function cacheKey(path) {
  return 'boea_cms_' + path.replace(/\//g, '_');
}

/** Synchronous local-cache read (used for first paint before the fetch lands). */
export function readCache(path, fallback) {
  try {
    const raw = localStorage.getItem(cacheKey(path));
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('CMS cache read failed:', path, e);
  }
  return fallback;
}

function writeCache(path, value) {
  try {
    localStorage.setItem(cacheKey(path), JSON.stringify(value));
  } catch (e) {
    console.error('CMS cache write failed:', path, e);
  }
}

/** Fetch a collection: database first, local cache / fallback otherwise. */
export async function cmsFetch(path, fallback) {
  const cached = readCache(path, fallback);
  const db = getDb();
  if (!db) return cached;
  try {
    const snap = await get(ref(db, path));
    if (snap.exists()) {
      const value = snap.val();
      writeCache(path, value);
      return value;
    }
  } catch (e) {
    console.error('CMS fetch failed:', path, e);
  }
  return cached;
}

/**
 * Save a collection. Always caches locally; attempts the database when
 * configured. Returns `{ ok, cloud, reason? }`.
 */
export async function cmsSave(path, value) {
  writeCache(path, value);
  const db = getDb();
  if (!db) return { ok: false, cloud: false, reason: 'Firebase is not connected' };
  try {
    await set(ref(db, path), value);
    return { ok: true, cloud: true };
  } catch (e) {
    console.error('CMS save failed:', path, e);
    return { ok: false, cloud: false, reason: e.message || 'Database write failed' };
  }
}

/**
 * Live-subscribe a collection. Without a database this calls back once with
 * the cached value and returns a no-op unsubscribe.
 */
export function cmsSubscribe(path, callback, fallback) {
  const db = getDb();
  if (!db) {
    callback(readCache(path, fallback));
    return () => {};
  }
  return onValue(
    ref(db, path),
    (snap) => {
      if (snap.exists()) {
        const value = snap.val();
        writeCache(path, value);
        callback(value);
      }
    },
    () => callback(readCache(path, fallback)),
  );
}
