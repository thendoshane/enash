import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { industries } from '../data/siteData';

export default function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries" title="The workflow matters more than the industry label." text="ENASH applies the same core technology capability to different operating environments." />
      <section className="section">
        <div className="container industry-grid simple-industry-grid">
          {industries.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p><Link to="/request-service">Discuss a requirement <ArrowRight size={14} /></Link></article>)}
        </div>
      </section>
      <CTA title="Your industry is not listed?" text="Send the workflow or requirement. We can assess whether ENASH is a fit." />
    </>
  );
}
