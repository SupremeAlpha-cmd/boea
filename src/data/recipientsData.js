import { PAST_RECIPIENTS_DATA } from './past_recipients_generated.js';

const STORAGE_KEY = 'boea_past_recipients';
const EVENT_KEY = 'boea-recipients-updated';

/**
 * Retrieves past recipients from localStorage with fallback to default data.
 */
export function getStoredRecipients() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading recipients from localStorage:', e);
  }
  return PAST_RECIPIENTS_DATA;
}

/**
 * Saves updated recipients to localStorage and notifies active listeners.
 */
export function saveStoredRecipients(recipients) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipients));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: recipients }));
  } catch (e) {
    console.error('Error saving recipients to localStorage:', e);
  }
}

/**
 * Resets recipients in localStorage back to default bundled dataset.
 */
export function resetStoredRecipients() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: PAST_RECIPIENTS_DATA }));
  } catch (e) {
    console.error('Error resetting recipients:', e);
  }
  return PAST_RECIPIENTS_DATA;
}

/**
 * Subscribes to changes made by the admin panel.
 */
export function subscribeToRecipients(callback) {
  const handler = (e) => {
    callback(e.detail || getStoredRecipients());
  };
  window.addEventListener(EVENT_KEY, handler);
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      callback(getStoredRecipients());
    }
  });

  return () => {
    window.removeEventListener(EVENT_KEY, handler);
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
