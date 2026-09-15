import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA({ title = 'Want to talk about an ENASH product?', text = 'Send product feedback, discuss a partnership, or get in touch about the company.' }) {
  return (
    <section className="cta-section">
      <div className="container cta-panel">
        <div><span className="eyebrow light">Start a conversation</span><h2>{title}</h2><p>{text}</p></div>
        <div className="cta-actions"><Link className="btn btn-cream btn-lg" to="/contact">Contact ENASH <ArrowRight size={17} /></Link><a className="btn btn-ghost-light btn-lg" href="mailto:thendos@enash.co.za"><Mail size={17} /> Email</a></div>
      </div>
    </section>
  );
}
