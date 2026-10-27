import { PAST_RECIPIENTS_DATA } from './past_recipients_generated.js';
import { cmsFetch, cmsSave, cmsSubscribe, readCache, CMS_PATHS } from '../lib/cms';

const EVENT_KEY = 'boea-recipients-updated';

// Recipients are CMS-backed (see `src/lib/cms.js`): the admin publishes once
// and every visitor reads the same list. The local cache below is only the
// fallback for first paint / unconfigured Firebase.

/**
 * Synchronous cache read with fallback to the bundled dataset.
 */
export function getStoredRecipients() {
  const cached = readCache(CMS_PATHS.recipients, null);
  if (Array.isArray(cached) && cached.length > 0) {
    return cached;
  }
  return PAST_RECIPIENTS_DATA;
}

/** Live read from the database (falls back to cache / bundled data). */
export async function fetchRecipients() {
  const fetched = await cmsFetch(CMS_PATHS.recipients, null);
  if (Array.isArray(fetched) && fetched.length > 0) {
    return fetched;
  }
  return getStoredRecipients();
}

/**
 * Saves updated recipients to the CMS and notifies active listeners.
 * Returns the CMS save result `{ ok, cloud }`.
 */
export async function saveStoredRecipients(recipients) {
  const result = await cmsSave(CMS_PATHS.recipients, recipients);
  window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: recipients }));
  return result;
}

/**
 * Resets recipients back to the default bundled dataset (publishes it).
 */
export async function resetStoredRecipients() {
  await cmsSave(CMS_PATHS.recipients, PAST_RECIPIENTS_DATA);
  window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: PAST_RECIPIENTS_DATA }));
  return PAST_RECIPIENTS_DATA;
}

/**
 * Subscribes to changes made by the admin panel (live database updates
 * plus same-tab admin events).
 */
export function subscribeToRecipients(callback) {
  const handler = (e) => {
    callback(e.detail || getStoredRecipients());
  };
  window.addEventListener(EVENT_KEY, handler);
  const unsubscribeCms = cmsSubscribe(CMS_PATHS.recipients, (value) => {
    if (Array.isArray(value) && value.length > 0) callback(value);
  }, null);

  return () => {
    window.removeEventListener(EVENT_KEY, handler);
    unsubscribeCms();
  };
}

/**
 * Compresses an image file client-side using an offscreen canvas.
 * Reduces raw 5-10MB photos to ~40-60KB lightweight Web/JPEG base64 data URLs.
 */
export function compressImageFile(file, maxWidth = 640, maxHeight = 640, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new window.Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
