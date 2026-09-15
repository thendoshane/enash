import { ExternalLink, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company, products } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="footer-brandline"><img src="/brand-mark.svg" alt="" /><img src="/enash-wordmark.png" alt="ENASH" /></div>
          <p>{company.tagline}</p>
          <span><MapPin size={15} /> Johannesburg, Gauteng, South Africa</span>
          <a href={`mailto:${company.email}`}><Mail size={15} /> {company.email}</a>
        </div>
        <div className="footer-column"><h4>Company</h4><Link to="/about">About</Link><Link to="/company">Company record</Link><Link to="/contact">Contact</Link><Link to="/faq">FAQ</Link></div>
        <div className="footer-column"><h4>Products</h4>{products.map((product) => <Link key={product.slug} to={`/products/${product.slug}`}>{product.name}</Link>)}</div>
        <div className="footer-column"><h4>Live</h4>{products.map((product) => <a key={product.slug} href={product.url} target="_blank" rel="noreferrer">{product.name} <ExternalLink size={12} /></a>)}</div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ENASH · {company.legalName}</span>
        <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
