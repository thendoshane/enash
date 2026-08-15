import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA({ title = 'Have something to build?', text = 'Tell ENASH what you need. We will turn your brief into a practical next step.' }) {
  return (
    <section className="cta-section">
      <div className="container cta-panel">
        <div><span className="eyebrow eyebrow-dark">Start here</span><h2>{title}</h2><p>{text}</p></div>
        <div className="cta-actions">
          <Link className="btn btn-dark" to="/request-service">Request a service <ArrowUpRight size={17} /></Link>
          <Link className="btn btn-ghost-dark" to="/contact">Contact ENASH</Link>
        </div>
      </div>
    </section>
  );
}
