import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import CTA from '../components/CTA';
import { projects, serviceGroups, services } from '../data/siteData';

function servicesFor(group) {
  return group.slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);
}

export default function Home() {
  return (
    <>
      <section className="hero home-hero">
        <div className="container hero-center">
          <span className="hero-kicker">ENASH · Technology &amp; digital delivery</span>
          <h1>Technology that gets <span>work done.</span></h1>
          <p>We design, build and support practical software, data, AI and cloud solutions for organisations that need technology to solve a real problem.</p>
          <div className="hero-actions centered">
            <Link className="btn btn-primary btn-lg" to="/request-service">Start a project <ArrowUpRight size={17} /></Link>
            <Link className="btn btn-outline btn-lg" to="/projects">See what we build <ArrowRight size={17} /></Link>
          </div>
          <div className="hero-proof">
            <span><Check size={15} /> Software & web</span>
            <span><Check size={15} /> Data & AI</span>
            <span><Check size={15} /> Cloud & automation</span>
            <span><Check size={15} /> ICT sourcing</span>
          </div>
        </div>
      </section>

      <section className="section home-services-section">
        <div className="container">
          <div className="section-heading-row">
            <div><span className="eyebrow">What we do</span><h2>One team. Four clear ways to help.</h2></div>
            <Link className="text-link" to="/services">All services <ArrowRight size={15} /></Link>
          </div>
          <div className="service-group-grid">
            {serviceGroups.map((group, index) => (
              <article className="service-group-card" key={group.title}>
                <span className="group-number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
                <div className="group-links">
                  {servicesFor(group).map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title} <ArrowRight size={13} /></Link>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading-row">
            <div><span className="eyebrow">Developed by ENASH</span><h2>Products our developers have built.</h2><p>Working systems, not mock-ups.</p></div>
            <Link className="text-link" to="/projects">View all <ArrowRight size={15} /></Link>
          </div>
          <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="section-heading-row compact-row">
            <div><span className="eyebrow">How we work</span><h2>Simple from the first conversation.</h2></div>
          </div>
          <div className="process-grid">
            <article><span>1</span><h3>Tell us the problem</h3><p>Start with the outcome you need, not technical jargon.</p></article>
            <article><span>2</span><h3>Agree the solution</h3><p>We define scope, priorities, timing and the right delivery approach.</p></article>
            <article><span>3</span><h3>Build and launch</h3><p>We develop, test, deploy and support the system after release.</p></article>
          </div>
        </div>
      </section>

      <CTA title="Have something to build?" text="Use the project form yourself, or let ENASH Assistant help shape the requirement first." />
    </>
  );
}
