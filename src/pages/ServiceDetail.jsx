import { CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { services } from '../data/siteData';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="not-found-inline">
        <div>
          <span>Service not found</span>
          <h1>This service page is unavailable.</h1>
          <p>Browse all services to find the right option for your project.</p>
          <Link className="btn btn-primary" to="/services">View services</Link>
        </div>
      </section>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <PageHero eyebrow="Service detail" title={service.title} text={service.short} />
      <section className="section">
        <div className="container service-detail-grid">
          <div>
            <h2>What this includes</h2>
            <div className="check-grid">
              {service.bullets.map((bullet) => (
                <div key={bullet}><CheckCircle2 size={16} /> {bullet}</div>
              ))}
            </div>
          </div>
          <aside className="company-summary-card">
            <span className="icon-box"><Icon size={22} /></span>
            <h2>Need this service?</h2>
            <p>Share your requirement and ENASH will scope the best delivery approach for you.</p>
            <Link className="btn btn-primary" to="/request-service">Start a project</Link>
          </aside>
        </div>
      </section>
      <CTA title="Need a tailored implementation?" text="Tell us your context, systems and goals so we can define practical scope." />
    </>
  );
}
