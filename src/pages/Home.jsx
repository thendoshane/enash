import { ArrowRight, ArrowUpRight, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import { projects, serviceGroups, services } from '../data/siteData';

function servicesFor(group) {
  return group.slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);
}

export default function Home() {
  return (
    <>
      <section className="hero home-hero home-hero-split">
        <div className="container hero-grid home-hero-grid">
          <div className="hero-copy home-hero-copy">
            <span className="hero-kicker">ENASH // Technology &amp; digital delivery</span>
            <h1>
              We design and build <span className="hero-accent">digital systems</span> that make work easier.
            </h1>
            <p>
              ENASH is a Johannesburg-based technology team delivering software, websites, automation, data, AI and cloud services across South Africa, with remote delivery available internationally.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/request-service">
                Start a project <ArrowUpRight size={18} />
              </Link>
              <Link className="btn btn-outline btn-lg" to="/services">
                View services <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-proof hero-proof-left">
              <span><Check size={16} /> Software &amp; web</span>
              <span><Check size={16} /> Data &amp; AI</span>
              <span><Check size={16} /> Cloud &amp; automation</span>
              <span><Check size={16} /> ICT sourcing</span>
            </div>
          </div>

          <aside className="hero-products-card" aria-label="Developed systems">
            <div className="hero-products-head">
              <span className="mono-label">DEVELOPED BY ENASH</span>
              <h2>Working products built by our developers.</h2>
              <p>Live systems you can open and use.</p>
            </div>

            <div className="hero-product-list">
              {projects.map((project, index) => (
                <a key={project.slug} href={project.url} target="_blank" rel="noreferrer" className="hero-product-row">
                  <span className={`product-dot product-dot-${index + 1}`} aria-hidden="true" />
                  <span className="hero-product-copy">
                    <strong>{project.name}</strong>
                    <small>{project.title}</small>
                  </span>
                  <ExternalLink size={18} />
                </a>
              ))}
            </div>

            <Link className="hero-products-link" to="/projects">
              Explore developed systems <ArrowRight size={17} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section home-services-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">What we do</span>
              <h2>One team. Four clear ways to help.</h2>
              <p>Choose the area closest to what you need. We can help shape the requirement from there.</p>
            </div>
            <Link className="text-link" to="/services">All services <ArrowRight size={16} /></Link>
          </div>
          <div className="service-group-grid">
            {serviceGroups.map((group, index) => (
              <article className="service-group-card" key={group.title}>
                <span className="group-number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
                <div className="group-links">
                  {servicesFor(group).map((service) => (
                    <Link key={service.slug} to={`/services/${service.slug}`}>
                      {service.title} <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section section-soft">
        <div className="container">
          <div className="section-heading-row compact-row">
            <div>
              <span className="eyebrow">How we work</span>
              <h2>Simple from the first conversation.</h2>
              <p>No unnecessary process. We start with the problem, agree what should be built, then deliver it.</p>
            </div>
          </div>
          <div className="process-grid">
            <article><span>01</span><h3>Tell us the problem</h3><p>Start with the outcome you need. You do not need to arrive with technical specifications.</p></article>
            <article><span>02</span><h3>Agree the solution</h3><p>We define scope, priorities, timing and the delivery approach before development starts.</p></article>
            <article><span>03</span><h3>Build and launch</h3><p>We develop, test, deploy and can continue supporting the system after release.</p></article>
          </div>
        </div>
      </section>

      <CTA title="Have something to build?" text="Use the project form yourself, or let ENASH Assistant help shape the requirement first." />
    </>
  );
}
