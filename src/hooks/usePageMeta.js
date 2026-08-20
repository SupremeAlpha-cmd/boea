import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'The Prestigious Best of Edo Award (BOEA) — Rewarding Excellence',
  '/about': 'About the Award — The Prestigious Best of Edo Award',
  '/about/history': 'Our History — The Prestigious Best of Edo Award',
  '/about/mission': 'Our Mission — The Prestigious Best of Edo Award',
  '/about/vision': 'Our Vision — The Prestigious Best of Edo Award',
  '/about/values': 'Core Values — The Prestigious Best of Edo Award',
  '/about/objectives': 'Our Objectives — The Prestigious Best of Edo Award',
  '/about/philosophy': 'Award Philosophy — The Prestigious Best of Edo Award',
  '/about/heritage': 'Our Edo Heritage — The Prestigious Best of Edo Award',
  '/about/people': 'Our People — The Prestigious Best of Edo Award',
  '/about/founder': 'The Founder & CEO — Sir Paul Ofoni | BOEA',
  '/about/advisory-board': 'Advisory Board — The Prestigious Best of Edo Award',
  '/about/screening-panel': 'Screening Panel — The Prestigious Best of Edo Award',
  '/categories': 'Award Categories — The Prestigious Best of Edo Award',
  '/nomination': 'Nominate a Laureate — Best of Edo Award 2026',
  '/edition-2026': '9th Edition 2026 — Best of Edo Award',
  '/recipients': 'Past Recipients & Laureates — Best of Edo Award',
  '/impact': 'Our Impact — The Prestigious Best of Edo Award',
  '/humanitarian': 'Humanitarian Support Scheme — Best of Edo Award',
  '/partners': 'Partners & Sponsorship — Best of Edo Award',
  '/previous-partners': 'Previous Partners & Media Coverage — BOEA',
  '/sponsors-logos': 'Official Sponsors Logos — Best of Edo Award',
  '/gallery': 'Official Photo & Video Gallery — Best of Edo Award',
  '/media': 'Media & Publicity — Best of Edo Award',
  '/faq': 'Frequently Asked Questions — Best of Edo Award',
  '/contact': 'Contact & Inquiries — Best of Edo Award',
  '/admin': 'Admin Portal — The Prestigious Best of Edo Award'
};

export default function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[pathname] || 'The Prestigious Best of Edo Award (BOEA)';
    document.title = title;

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://bestofedoaward.com${pathname}`);
  }, [pathname]);
}
