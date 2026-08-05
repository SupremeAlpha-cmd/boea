import { useState } from 'react';
import {
  LayoutDashboard,
  Award,
  Image,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  Lock,
  FileText
} from 'lucide-react';
import './Admin.css';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Award, label: 'Categories' },
  { icon: Users, label: 'Nominations' },
  { icon: Image, label: 'Gallery' },
  { icon: CalendarDays, label: 'Edition 2026' },
  { icon: FileText, label: 'Pages & Content' },
  { icon: Settings, label: 'Settings' }
];

function LoginGate({ onLogin }) {
  const [password, setPassword] = useState('');

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <Lock size={28} className="admin-login-icon" />
        <h1 className="headline-lg">BOEA Admin</h1>
        <p className="body-md text-muted">Sign in to manage the platform.</p>
        <form
          className="admin-login-form"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(password);
          }}
        >
          <input
            type="password"
            className="interest-input"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary admin-login-btn">
            Sign In
          </button>
        </form>
        <p className="caption text-muted">Authentication coming soon — the admin area is a shell.</p>
      </div>
    </div>
  );
}

function ManagerShell() {
  const [active, setActive] = useState('Dashboard');

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">B</span>
          <span>BOEA Admin</span>
        </div>
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`admin-nav-item ${active === item.label ? 'active' : ''}`}
                onClick={() => setActive(item.label)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button type="button" className="admin-nav-item admin-logout">
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-content-header">
          <h1 className="headline-md">{active}</h1>
          <span className="label-caps admin-env">Admin Preview</span>
        </header>

        <div className="admin-panel">
          <p className="body-lg text-muted">
            The {active.toLowerCase()} manager will be built here once the backend and
            authentication are connected.
          </p>
          <div className="admin-placeholder">
            <LayoutDashboard size={32} className="admin-placeholder-icon" />
            <p className="body-md text-muted">
              This is a placeholder shell. Coming soon: {active.toLowerCase()} management,
              submissions inbox, gallery uploads and edition planning.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);

  return authed ? <ManagerShell /> : <LoginGate onLogin={() => setAuthed(true)} />;
}
