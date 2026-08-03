import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import AwardCategories from './pages/AwardCategories';
import Gallery from './pages/Gallery';
import PastWinners from './pages/PastWinners';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="boea-app">
      <Navbar />
      <ScrollToTop />
      <Outlet />
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
          <Route path="/categories" element={<AwardCategories />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/past-winners" element={<PastWinners />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
