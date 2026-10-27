/**
 * BOEA Admin Auth — Firebase Authentication (email + password).
 *
 * This replaces the old client-side password check, which shipped a default
 * password inside the JS bundle and stored any replacement in the admin's own
 * browser localStorage. Nothing credential-like lives in this file or in the
 * bundle anymore: sign-in is verified by Firebase, and the session is a real
 * Firebase Auth session (persisted per the "remember me" choice).
 *
 * The admin account itself is created in the Firebase console (see
 * `FIREBASE_SETUP.md`) — never in code, never in the repo.
 *
 * Audit trail: written to `admin/auditLogs` in the database when connected
 * (admin-only per `database.rules.json`), otherwise kept in localStorage.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { getAuthClient, isFirebaseConfigured } from '../lib/firebase';
import { cmsFetch, cmsSave, CMS_PATHS } from '../lib/cms';

const AUDIT_LOCAL_KEY = 'boea_admin_audit_logs';

function readLocalAudit() {
  try {
    const logs = JSON.parse(localStorage.getItem(AUDIT_LOCAL_KEY) || '[]');
    return Array.isArray(logs) ? logs : [];
  } catch {
    return [];
  }
}

function writeLocalAudit(logs) {
  try {
    localStorage.setItem(AUDIT_LOCAL_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to persist audit logs locally:', e);
  }
}

/** Human-readable messages for Firebase Auth errors (no raw codes to users). */
function friendlyAuthError(e) {
  const code = e?.code || '';
  if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
    return 'Invalid email or password.';
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many failed attempts. Please wait a few minutes and try again.';
  }
  if (code === 'auth/requires-recent-login') {
    return 'Please sign in again, then retry changing your password.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network error. Check your connection and try again.';
  }
  if (code === 'auth/invalid-email') {
    return 'That email address does not look right.';
  }
  return 'Sign-in failed. Please try again.';
}

export function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);

  const isAuthenticated = !!user;
  const isConfigured = isFirebaseConfigured;

  useEffect(() => {
    const auth = getAuthClient();
    if (!auth) {
      setAuthLoading(false);
      setAuditLogs(readLocalAudit());
      return undefined;
    }
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setAuthLoading(false);
      if (u) {
        const logs = await cmsFetch(CMS_PATHS.auditLogs, readLocalAudit());
        setAuditLogs(Array.isArray(logs) ? logs : []);
      } else {
        setAuditLogs(readLocalAudit());
      }
    });
    return unsubscribe;
  }, []);

  // Log an administrative activity (database when connected, local otherwise)
  const logAuditAction = useCallback((action, details = '') => {
    const newEntry = {
      id: 'log-' + Date.now(),
      action,
      details,
      timestamp: new Date().toLocaleString(),
    };
    setAuditLogs((prev) => {
      const updated = [newEntry, ...prev].slice(0, 100); // Keep last 100 logs
      if (isFirebaseConfigured) {
        cmsSave(CMS_PATHS.auditLogs, updated);
      } else {
        writeLocalAudit(updated);
      }
      return updated;
    });
  }, []);

  const login = useCallback(
    async (email, password, rememberMe = true) => {
      const auth = getAuthClient();
      if (!auth) {
        const msg = 'Firebase is not connected yet. Follow FIREBASE_SETUP.md, then sign in.';
        setAuthError(msg);
        return { success: false, error: msg };
      }
      try {
        await setPersistence(
          auth,
          rememberMe ? browserLocalPersistence : browserSessionPersistence,
        );
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setAuthError('');
        logAuditAction('Admin Login', 'Successful administrative authentication session initiated.');
        return { success: true };
      } catch (e) {
        const msg = friendlyAuthError(e);
        setAuthError(msg);
        logAuditAction('Failed Login Attempt', 'Unauthorized login attempt detected.');
        return { success: false, error: msg };
      }
    },
    [logAuditAction],
  );

  const logout = useCallback(async () => {
    const auth = getAuthClient();
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Sign-out failed:', e);
      }
    }
    setUser(null);
    logAuditAction('Admin Logout', 'Administrative session terminated.');
  }, [logAuditAction]);

  const changePassword = useCallback(
    async (currentPassword, newPassword) => {
      const auth = getAuthClient();
      const currentUser = auth?.currentUser;
      if (!auth || !currentUser) {
        return { success: false, error: 'You are not signed in.' };
      }
      if (!newPassword || newPassword.length < 6) {
        return { success: false, error: 'New password must be at least 6 characters long.' };
      }
      try {
        const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        logAuditAction('Password Changed', 'Administrative security credentials updated.');
        return { success: true };
      } catch (e) {
        return { success: false, error: friendlyAuthError(e) };
      }
    },
    [logAuditAction],
  );

  return {
    isAuthenticated,
    user,
    userEmail: user?.email || '',
    isConfigured,
    authLoading,
    authError,
    login,
    logout,
    changePassword,
    auditLogs,
    logAuditAction,
  };
}
