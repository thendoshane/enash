import { Link } from 'react-router-dom';
import { ExternalLink, MapPin } from 'lucide-react';
import { company, projects, services } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand brand-light"><span className="brand-mark">E</span><span><strong>ENASH</strong><small>Technology & digital delivery</small></span></div>
          <p>Software, digital products, data, AI, automation, cloud and technology services delivered through {company.legalName}.</p>
          <p className="footer-address"><MapPin size={16} /> Johannesburg, Gauteng, South Africa</p>
        </div>
        <div><h4>Company</h4><Link to="/about">About</Link><Link to="/projects">Developed systems</Link><Link to="/industries">Industries</Link><Link to="/compliance">Company documents</Link><Link to="/contact">Contact</Link></div>
        <div><h4>Services</h4>{services.slice(0, 5).map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}</Link>)}</div>
        <div><h4>Developed by ENASH</h4>{projects.map((project) => <a key={project.slug} href={project.url} target="_blank" rel="noreferrer">{project.name} <ExternalLink size={13} /></a>)}<Link className="footer-action" to="/request-service">Start a project</Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} ENASH / {company.legalName}</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/faq">FAQ</Link></div></div>
    </footer>
  );
}
