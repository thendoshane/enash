import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA({ title = 'Ready to start?', text = 'Tell ENASH what you need. Start with a rough idea or a complete requirement.' }) {
  return (
    <section className="cta-section">
      <div className="container cta-panel">
        <div><span className="eyebrow">Work with ENASH</span><h2>{title}</h2><p>{text}</p></div>
        <div className="cta-actions">
          <Link className="btn btn-primary btn-lg" to="/request-service">Start a project <ArrowUpRight size={17} /></Link>
          <Link className="btn btn-outline btn-lg" to="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
