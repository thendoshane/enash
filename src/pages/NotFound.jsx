import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="not-found"><div><span>404</span><h1>This page is not here.</h1><p>The link may have changed or the page does not exist.</p><Link className="btn btn-primary" to="/"><ArrowLeft size={16} /> Back home</Link></div></section>;
}
