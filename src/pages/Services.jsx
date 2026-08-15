import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import SectionHeading from '../components/SectionHeading';
import CTA from '../components/CTA';
import { services } from '../data/siteData';

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Digital, data, AI and technology services that connect together." text="Choose a single service or combine multiple capabilities into one delivery. ENASH can support the full path from requirement and design to deployment, communication and support." />
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container split-section compact">
          <SectionHeading eyebrow="Not sure what to choose?" title="Describe the business problem instead of picking a technology." text="A service request can start with the current problem, users, desired result and deadline. ENASH can map that brief to the right delivery approach." />
          <div className="prompt-card"><strong>Example brief</strong><p>“We currently collect requests on WhatsApp and Excel. We need customers to submit online, staff to approve them, and management to see progress.”</p><Link to="/request-service">Send your own brief <ArrowRight size={16} /></Link></div>
        </div>
      </section>
      <CTA />
    </>
  );
}
