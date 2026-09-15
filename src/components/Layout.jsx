import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIWidget from './AIWidget';
import { products } from '../data/siteData';

const titles = {
  '/': ['ENASH | Building practical technology for everyday life', 'ENASH is a South African technology company building practical software across AI, mobility, operations and local discovery.'],
  '/about': ['About | ENASH', 'Learn how ENASH develops, operates and improves practical technology products from South Africa.'],
  '/company': ['Company | ENASH', 'Registered company information for ENASH and INDESIGN AND DEVELOPERS (PTY) LTD.'],
  '/contact': ['Contact | ENASH', 'Contact ENASH about products, partnerships, investment, media or company matters.'],
};

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const productSlug = pathname.startsWith('/products/') ? pathname.split('/').pop() : null;
    const product = productSlug ? products.find((item) => item.slug === productSlug) : null;
    const [title, description] = titles[pathname] || [product ? `${product.name} | ENASH` : 'ENASH', product?.description || 'ENASH builds and operates practical digital products from South Africa.'];
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://enash.co.za${pathname === '/' ? '/' : pathname}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (ogUrl) ogUrl.setAttribute('content', `https://enash.co.za${pathname === '/' ? '/' : pathname}`);
  }, [pathname]);

  return (
    <div className="site-shell">
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <AIWidget />
    </div>
  );
}
