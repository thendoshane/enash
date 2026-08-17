import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { serviceGroups, services } from '../data/siteData';

function servicesFor(group) {
  return group.slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);
}

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Choose the outcome, not a pile of technology." text="ENASH provides software development, AI, data, cloud, automation, web and ICT services from Johannesburg to organisations across South Africa, with remote delivery available internationally. Choose the area closest to the outcome you need." />
      <section className="section">
        <div className="container service-directory">
          {serviceGroups.map((group, index) => (
            <section className="service-directory-group" key={group.title}>
              <div className="service-directory-intro"><span>0{index + 1}</span><h2>{group.title}</h2><p>{group.text}</p></div>
              <div className="service-directory-list">
                {servicesFor(group).map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link key={service.slug} to={`/services/${service.slug}`}>
                      <span className="icon-box"><Icon size={20} /></span>
                      <div><strong>{service.title}</strong><p>{service.short}</p></div>
                      <ArrowRight size={18} />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
      <CTA title="Not sure which service fits?" text="Describe the workflow, problem or outcome. ENASH can help define the right scope." />
    </>
  );
}
