import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CTA from '../components/CTA';
import { industries } from '../data/siteData';

export default function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Technology capability that adapts to the operating environment." text="ENASH is not limited to one vertical. The same core skills — software, data, cloud, automation and digital design — can be applied to different industry workflows." />
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Where we can help" title="Common business contexts for ENASH solutions." />
          <div className="industry-grid">
            {industries.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><Link to="/request-service">Discuss a requirement <ArrowRight size={15} /></Link></article>)}
          </div>
        </div>
      </section>
      <CTA title="Your industry is not listed?" text="That does not automatically exclude the project. Send the workflow or requirement and ENASH can assess the fit." />
    </>
  );
}
