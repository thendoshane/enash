import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function NotFound(){return <section className="section"><div className="container not-found"><span className="eyebrow">404</span><h1>That page is not here.</h1><p>Return to the ENASH homepage to continue.</p><Link className="btn btn-dark" to="/"><ArrowLeft size={15}/> Back home</Link></div></section>}
