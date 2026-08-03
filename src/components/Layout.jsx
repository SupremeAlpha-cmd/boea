import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Layout.css';

const NAV_LINKS = [
  { to: '/', label: 'About', end: true },
  { to: '/categories', label: 'Categories' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/past-winners', label: 'Past Winners' }
];

function isActiveFor(link, pathname) {
  if (link.end) return pathname === '/';
  return pathname.startsWith(link.to);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('boea-theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('boea-theme', theme);
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-brand">
          <img src="/logo.png" alt="The Best of Edo Award logo" className="nav-logo" />
          <span className="nav-brand-name">The Best of Edo</span>
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <Link to="/categories" className="btn btn-primary nav-nominate">Nominate</Link>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-brand-name">The Best of Edo</span>
          <p>
            Upholding the legacy of the Benin Empire through the recognition of modern
            achievements and cultural preservation.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Quick Links</span>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/categories">Award Categories</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/past-winners">Past Winners</Link>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Newsletter</span>
          <p>Receive updates on the awards and heritage stories.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" aria-label="Email Address" />
            <button className="newsletter-send" type="submit" aria-label="Subscribe">
              Send
            </button>
          </form>
          <p className="footer-copyright">
            &copy; 2026 The Best of Edo Awards. Honoring the Great Benin Legacy.
          </p>
        </div>
      </div>
    </footer>
  );
}
