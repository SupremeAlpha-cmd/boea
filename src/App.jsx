import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Navbar, Footer } from './components/Layout';

// Lazy-loaded pages for code splitting & optimal load performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const History = lazy(() => import('./pages/History'));
const Mission = lazy(() => import('./pages/Mission'));
const Vision = lazy(() => import('./pages/Vision'));
const Values = lazy(() => import('./pages/Values'));
const Objectives = lazy(() => import('./pages/Objectives'));
const AwardPhilosophy = lazy(() => import('./pages/AwardPhilosophy'));
const Heritage = lazy(() => import('./pages/Heritage'));
const People = lazy(() => import('./pages/People'));
const Founder = lazy(() => import('./pages/Founder'));
const AdvisoryBoard = lazy(() => import('./pages/AdvisoryBoard'));
const AwardCategories = lazy(() => import('./pages/AwardCategories'));
const Nomination = lazy(() => import('./pages/Nomination'));
const Impact = lazy(() => import('./pages/Impact'));
const Humanitarian = lazy(() => import('./pages/Humanitarian'));
const PastRecipients = lazy(() => import('./pages/PastRecipients'));
const Edition2026 = lazy(() => import('./pages/Edition2026'));
const Partners = lazy(() => import('./pages/Partners'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Media = lazy(() => import('./pages/Media'));
const Faq = lazy(() => import('./pages/Faq'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--gold)'
      }}
    >
      <div className="label-caps gold-text">Loading Best of Edo Award...</div>
    </div>
  );
}

function Layout() {
  return (
    <div className="boea-app">
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/vision" element={<Vision />} />
          <Route path="/about/values" element={<Values />} />
          <Route path="/about/objectives" element={<Objectives />} />
          <Route path="/about/philosophy" element={<AwardPhilosophy />} />
          <Route path="/about/heritage" element={<Heritage />} />
          <Route path="/about/people" element={<People />} />
          <Route path="/about/founder" element={<Founder />} />
          <Route path="/about/advisory-board" element={<AdvisoryBoard />} />
          <Route path="/categories" element={<AwardCategories />} />
          <Route path="/nomination" element={<Nomination />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/humanitarian" element={<Humanitarian />} />
          <Route path="/recipients" element={<PastRecipients />} />
          <Route path="/edition-2026" element={<Edition2026 />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/media" element={<Media />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
