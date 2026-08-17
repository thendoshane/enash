import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { company, projects } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark">E</span>
            <span className="brand-copy"><strong>ENASH</strong><small>Technology that gets work done.</small></span>
          </Link>
          <p>Software, data, AI, cloud and ICT services from Johannesburg, South Africa.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/services">Services</Link>
          <Link to="/projects">Developed systems</Link>
          <Link to="/procurement">Procurement</Link>
          <Link to="/industries">Industries</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/about">About ENASH</Link>
          <Link to="/compliance">Request company documents</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div>
          <h4>Products</h4>
          {projects.map((project) => (
            <a key={project.slug} href={project.url} target="_blank" rel="noreferrer">
              {project.name} <ExternalLink size={12} />
            </a>
          ))}
          <Link className="footer-action" to="/request-service">Start a project</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ENASH · {company.legalName}</span>
        <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
