import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIWidget from './AIWidget';
import SEO from './SEO';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="site-shell">
      <SEO />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AIWidget />
    </div>
  );
}
