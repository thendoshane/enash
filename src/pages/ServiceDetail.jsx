import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { services } from '../data/siteData';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <div className="container not-found-inline"><h1>Service not found</h1><Link to="/services">Back to services</Link></div>;
  const Icon = service.icon;

  return (
    <>
      <PageHero eyebrow="ENASH service" title={service.title} text={service.short}>
        <div className="service-hero-icon"><Icon size={38} /></div>
      </PageHero>
      <section className="section">
        <div className="container service-detail-grid">
          <div>
            <Link to="/services" className="back-link"><ArrowLeft size={15} /> All services</Link>
            <h2>What ENASH delivers</h2>
            <p className="body-large">{service.overview}</p>

            <h2>What this can include</h2>
            <div className="check-grid">{service.bullets.map((item) => <div key={item}><CheckCircle2 size={19} /><span>{item}</span></div>)}</div>

            <h2>When this service is a good fit</h2>
            <div className="check-grid service-fit-grid">{service.bestFor.map((item) => <div key={item}><CheckCircle2 size={19} /><span>{item}</span></div>)}</div>

            <h2>How a project starts</h2>
            <p className="body-large">Send the problem, desired outcome, users, timing and any existing systems that need to connect. ENASH will use the brief to identify the right scope and next step. We are based in Johannesburg and deliver technology work across South Africa, with remote collaboration available for international projects.</p>
          </div>
          <aside className="request-side-card">
            <span className="eyebrow">Request this service</span>
            <h3>Turn the requirement into a project brief.</h3>
            <p>The request form captures the information needed to respond properly and sends the submission into the ENASH lead workflow.</p>
            <Link className="btn btn-primary" to={`/request-service?service=${service.slug}`}>Start request <ArrowRight size={16} /></Link>
          </aside>
        </div>
      </section>
      <CTA title={`Ready to discuss ${service.title.toLowerCase()}?`} />
    </>
  );
}
