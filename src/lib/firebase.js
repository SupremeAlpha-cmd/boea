/**
 * BOEA Firebase — single app init shared by Analytics, Admin Auth and the CMS.
 *
 * Config comes only from Vite env vars (see `.env.example`). Nothing secret
 * lives in source: Firebase web config values are public identifiers, and all
 * real protection comes from Realtime Database Rules (`database.rules.json`)
 * plus Firebase Auth — never from anything baked into this bundle.
 *
 * Until the env vars are supplied, every accessor below returns null and the
 * site keeps working on its bundled defaults + local cache (see `cms.js`).
 * The admin portal refuses sign-in in that state instead of pretending.
 */

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

/** Enough config for Realtime Database (analytics + CMS reads). */
export const isDatabaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.databaseURL,
);

/**
 * Enough config for Admin Auth: Auth needs authDomain as well as the
 * database values, so the admin gate can tell "not connected" apart from
 * "wrong email/password".
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.databaseURL && firebaseConfig.authDomain,
);

let app = null;

export function getFirebaseApp() {
  if (!isDatabaseConfigured) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb() {
  const a = getFirebaseApp();
  return a ? getDatabase(a) : null;
}

export function getAuthClient() {
  const a = getFirebaseApp();
  return a ? getAuth(a) : null;
}
