import { useState, useEffect, useCallback } from 'react';

const DEFAULT_PASSWORD_HASH = 'BOEA-ADMIN-KEY'; // Configurable master password
const SESSION_KEY = 'boea_admin_auth_session';
const PASS_KEY = 'boea_admin_pass_key';
const AUDIT_LOGS_KEY = 'boea_admin_audit_logs';

const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 Minutes

function getStoredPassword() {
  return localStorage.getItem(PASS_KEY) || DEFAULT_PASSWORD_HASH;
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [authError, setAuthError] = useState('');

  // Log an administrative activity
  const logAuditAction = useCallback((action, details = '') => {
    const newEntry = {
      id: 'log-' + Date.now(),
      action,
      details,
      timestamp: new Date().toLocaleString()
    };
    try {
      const existing = JSON.parse(localStorage.getItem(AUDIT_LOGS_KEY) || '[]');
      const updated = [newEntry, ...existing].slice(0, 100); // Keep last 100 logs
      localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(updated));
      setAuditLogs(updated);
    } catch (e) {
      console.error('Failed to update audit logs:', e);
    }
  }, []);

  // Validate active session token
  const checkSession = useCallback(() => {
    const sessionDataStr = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!sessionDataStr) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const session = JSON.parse(sessionDataStr);
      const now = Date.now();
      const maxAge = session.rememberMe ? 7 * 24 * 60 * 60 * 1000 : IDLE_TIMEOUT_MS;

      if (now - session.timestamp > maxAge) {
        // Session expired
        logout();
        setAuthError('Session expired due to inactivity. Please sign in again.');
        return false;
      }

      // Refresh session timestamp on active use
      session.timestamp = now;
      const storage = session.rememberMe ? localStorage : sessionStorage;
      storage.setItem(SESSION_KEY, JSON.stringify(session));

      setIsAuthenticated(true);
      return true;
    } catch (e) {
      logout();
      return false;
    }
  }, []);

  useEffect(() => {
    checkSession();

    // Fetch initial audit logs
    try {
      const logs = JSON.parse(localStorage.getItem(AUDIT_LOGS_KEY) || '[]');
      setAuditLogs(logs);
    } catch (e) {
      setAuditLogs([]);
    }
  }, [checkSession]);

  const login = (password, rememberMe = false) => {
    const currentPass = getStoredPassword();

    if (password === currentPass) {
      const session = {
        token: 'token-' + Date.now() + '-' + Math.random().toString(36).substring(2),
        timestamp: Date.now(),
        rememberMe
      };

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(SESSION_KEY, JSON.stringify(session));

      setIsAuthenticated(true);
      setAuthError('');

      logAuditAction('Admin Login', 'Successful administrative authentication session initiated.');
      return { success: true };
    } else {
      setAuthError('Invalid administrator credentials. Please check your password.');
      logAuditAction('Failed Login Attempt', 'Unauthorized login attempt detected.');
      return { success: false, error: 'Invalid administrator credentials.' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    logAuditAction('Admin Logout', 'Administrative session terminated.');
  };

  const changePassword = (currentPass, newPass) => {
    const masterPass = getStoredPassword();
    if (currentPass !== masterPass) {
      return { success: false, error: 'Current password does not match.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    localStorage.setItem(PASS_KEY, newPass);
    logAuditAction('Password Changed', 'Administrative security credentials updated.');
    return { success: true };
  };

  return {
    isAuthenticated,
    authError,
    login,
    logout,
    changePassword,
    auditLogs,
    logAuditAction
  };
}
