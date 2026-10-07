import { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Globe, Link2, CalendarDays, AlertCircle } from 'lucide-react';
import {
  isAnalyticsEnabled,
  getRecentPageViews,
  computeStats,
} from '../lib/analytics';
import './AdminAnalytics.css';

/**
 * Analytics dashboard for the BOEA admin.
 * Shows a setup prompt until Firebase is configured.
 */
export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAnalyticsEnabled) {
      setLoading(false);
      return;
    }
    getRecentPageViews()
      .then((views) => setStats(computeStats(views)))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (!isAnalyticsEnabled) {
    return (
      <div className="analytics-setup">
        <AlertCircle size={32} className="analytics-setup-icon" />
        <h3>Analytics not connected</h3>
        <p>
          Add your Firebase keys to <code>.env</code> (see <code>.env.example</code>)
          and redeploy. Pageview tracking will start automatically.
        </p>
        <ol>
          <li>Create a project at console.firebase.google.com</li>
          <li>Enable Realtime Database</li>
          <li>Copy the web app config into <code>.env</code> as VITE_FIREBASE_*</li>
        </ol>
      </div>
    );
  }

  if (loading) {
    return <p className="analytics-loading">Loading analytics…</p>;
  }

  if (!stats) {
    return <p className="analytics-loading">Could not load analytics data.</p>;
  }

  const maxDaily = Math.max(...stats.dailyViews.map((d) => d.views), 1);

  return (
    <div className="analytics-dash">
      {/* KPI cards */}
      <div className="analytics-kpis">
        <div className="analytics-kpi">
          <Eye size={18} />
          <div>
            <p className="analytics-kpi-value">{stats.totalViews.toLocaleString()}</p>
            <p className="analytics-kpi-label">Page Views</p>
          </div>
        </div>
        <div className="analytics-kpi">
          <Users size={18} />
          <div>
            <p className="analytics-kpi-value">{stats.uniqueVisitors.toLocaleString()}</p>
            <p className="analytics-kpi-label">Unique Visitors</p>
          </div>
        </div>
      </div>

      {/* Daily chart (CSS bars, no chart lib needed) */}
      <div className="analytics-card">
        <h4><CalendarDays size={16} /> Views — last 14 days</h4>
        {stats.dailyViews.length === 0 ? (
          <p className="analytics-empty">No data yet.</p>
        ) : (
          <div className="analytics-bars">
            {stats.dailyViews.map((d) => (
              <div key={d.date} className="analytics-bar-col" title={`${d.date}: ${d.views}`}>
                <div
                  className="analytics-bar"
                  style={{ height: `${Math.max(4, (d.views / maxDaily) * 100)}%` }}
                />
                <span className="analytics-bar-label">{d.date.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="analytics-grid-2">
        {/* Top pages */}
        <div className="analytics-card">
          <h4><BarChart3 size={16} /> Top Pages</h4>
          {stats.topPages.length === 0 ? (
            <p className="analytics-empty">No data yet.</p>
          ) : (
            <ul className="analytics-list">
              {stats.topPages.map((p) => (
                <li key={p.path}>
                  <span className="analytics-list-key">{p.path}</span>
                  <span className="analytics-list-val">{p.views.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Referrers */}
        <div className="analytics-card">
          <h4><Globe size={16} /> Top Referrers</h4>
          {stats.topReferrers.length === 0 ? (
            <p className="analytics-empty">No referrer data yet.</p>
          ) : (
            <ul className="analytics-list">
              {stats.topReferrers.map((r) => (
                <li key={r.referrer}>
                  <span className="analytics-list-key"><Link2 size={12} /> {r.referrer}</span>
                  <span className="analytics-list-val">{r.views.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="analytics-note">
        Privacy-friendly: no cookies, no personal data — just page, referrer and a random session id.
      </p>
    </div>
  );
}
