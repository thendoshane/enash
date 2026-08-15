import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIWidget from './AIWidget';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const label = pathname === '/' ? 'Home' : pathname.split('/').filter(Boolean).map((part) => part.replaceAll('-', ' ')).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' · ');
    document.title = `${label} | ENASH`;
  }, [pathname]);

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AIWidget />
    </div>
  );
}
