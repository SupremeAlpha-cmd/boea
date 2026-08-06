import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Layout.css';

const NAV_GROUPS = [
  {
    label: 'About',
    type: 'dropdown',
    items: [
      { to: '/about', label: 'About the Award' },
      { to: '/about/history', label: 'Our History' },
      { to: '/about/mission', label: 'Mission' },
      { to: '/about/vision', label: 'Vision' },
      { to: '/about/values', label: 'Core Values' },
      { to: '/about/objectives', label: 'Objectives' },
      { to: '/about/philosophy', label: 'Award Philosophy' },
      { to: '/about/heritage', label: 'Our Heritage' },
      { to: '/about/people', label: 'Our People' },
      { to: '/about/founder', label: 'The Founder' },
      { to: '/about/advisory-board', label: 'Advisory Board' }
    ]
  },
  {
    label: 'The Award',
    type: 'dropdown',
    items: [
      { to: '/categories', label: 'Award Categories' },
      { to: '/nomination', label: 'Nomination & Selection' },
      { to: '/edition-2026', label: '9th Edition 2026' },
      { to: '/recipients', label: 'Past Recipients' }
    ]
  },
  {
    label: 'Impact',
    type: 'dropdown',
    items: [
      { to: '/impact', label: 'Our Impact' },
      { to: '/humanitarian', label: 'Humanitarian Scheme' }
    ]
  },
  {
    label: 'Media',
    type: 'dropdown',
    items: [
      { to: '/gallery', label: 'Gallery' },
      { to: '/media', label: 'Media & Publicity' },
      { to: '/partners', label: 'Partners & Sponsors' },
      { to: '/sponsors-logos', label: 'Sponsors Logos' }
    ]
  },
  { to: '/faq', label: 'FAQ', type: 'link' },
  { to: '/contact', label: 'Contact', type: 'link' }
];

function isGroupActive(group, pathname) {
  return group.items.some((item) =>
    item.to === '/about' ? pathname === '/about' || pathname.startsWith('/about/') : pathname.startsWith(item.to)
  );
}

function isLinkActive(to, pathname) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to);
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

function DropdownNav({ group, pathname, onNavigate, expanded, onToggle }) {
  const active = isGroupActive(group, pathname);

  return (
    <div className={`nav-dropdown ${active ? 'has-active' : ''} ${expanded ? 'expanded' : ''}`}>
      <button type="button" className="nav-dropdown-btn" onClick={onToggle}>
        {group.label}
        <ChevronDown size={14} className="nav-dropdown-chevron" />
      </button>
      <div className="nav-dropdown-panel">
        {group.items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-dropdown-link ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
          >
            {item.label}
            <ChevronRight size={14} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const toggleMenu = () => {
    setOpen((v) => !v);
    setActiveMenu(null);
  };

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-brand">
          <img src="/logo.png" alt="The Prestigious Best of Edo Award logo" className="nav-logo" />
          <span className="nav-brand-name">The Prestigious Best of Edo Award</span>
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_GROUPS.map((group) =>
            group.type === 'dropdown' ? (
              <DropdownNav
                key={group.label}
                group={group}
                pathname={pathname}
                expanded={activeMenu === group.label}
                onToggle={() =>
                  setActiveMenu((current) => (current === group.label ? null : group.label))
                }
                onNavigate={() => setOpen(false)}
              />
            ) : (
              <NavLink
                key={group.to}
                to={group.to}
                className={({ isActive }) =>
                  `nav-link ${isActive || isLinkActive(group.to, pathname) ? 'active' : ''}`
                }
              >
                {group.label}
              </NavLink>
            )
          )}
          <Link to="/nomination" className="btn btn-gold nav-mobile-cta">
            Nominate Someone
          </Link>
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <Link to="/nomination" className="btn btn-primary nav-nominate">Nominate</Link>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={toggleMenu}
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
          <span className="footer-brand-name">The Prestigious Best of Edo Award</span>
          <p>
            The Prestigious Best of Edo Award is a humanitarian, heritage and civic awards platform
            honouring excellence, service and innovation across Edo State and beyond.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-heading">About</span>
          <div className="footer-links">
            <Link to="/about">About the Award</Link>
            <Link to="/about/history">Our History</Link>
            <Link to="/about/mission">Mission & Vision</Link>
            <Link to="/about/values">Core Values</Link>
            <Link to="/about/founder">The Founder</Link>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-heading">The Award</span>
          <div className="footer-links">
            <Link to="/categories">Award Categories</Link>
            <Link to="/nomination">Nomination & Selection</Link>
            <Link to="/edition-2026">9th Edition 2026</Link>
            <Link to="/recipients">Past Recipients</Link>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Connect</span>
          <div className="footer-links">
            <Link to="/contact">Contact Us</Link>
            <Link to="/faq">FAQs</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/media">Media & Publicity</Link>
            <Link to="/partners">Partners & Sponsors</Link>
          </div>
          <p className="footer-copyright">
            &copy; 2026 The Prestigious Best of Edo Awards &middot; Walkfront African Network Limited
          </p>
        </div>
      </div>
    </footer>
  );
}
