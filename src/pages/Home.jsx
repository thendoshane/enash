import { ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import CTA from '../components/CTA';
import { company, projects, services } from '../data/siteData';

export default function Home() {
  return (
    <>
      <section className="hero simple-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">ENASH · Technology & digital delivery</span>
            <h1>We design and build digital systems that help organisations work better.</h1>
            <p>Software, websites, automation, data, AI, cloud services and technology support delivered through one practical team.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/request-service">Start a project <ArrowUpRight size={18} /></Link>
              <Link className="btn btn-outline btn-lg" to="/services">View services <ArrowRight size={18} /></Link>
            </div>
            <div className="hero-trust">
              <span><CheckCircle2 size={15} /> Registered South African company</span>
              <span><CheckCircle2 size={15} /> CSD supplier</span>
              <span><CheckCircle2 size={15} /> B-BBEE Level 1</span>
            </div>
          </div>

          <aside className="developer-showcase">
            <span className="eyebrow">Developed by ENASH Developers</span>
            <h2>Working products built by our developers.</h2>
            <div className="developer-project-list">
              {projects.map((project) => (
                <a key={project.slug} href={project.url} target="_blank" rel="noreferrer">
                  <div><strong>{project.name}</strong><small>{project.title}</small></div>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
            <Link className="inline-action" to="/projects">See what our developers have built <ArrowRight size={16} /></Link>
          </aside>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><span>Trading brand</span><strong>ENASH</strong></div>
          <div><span>Legal entity</span><strong>{company.legalName}</strong></div>
          <div><span>Location</span><strong>Johannesburg, South Africa</strong></div>
          <div><span>Work with us</span><strong>Projects · Services · Procurement</strong></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Services" title="What ENASH can help you build or improve." text="Choose a focused service or combine capabilities into one project." />
          <div className="services-grid home-services">
            {services.slice(0, 6).map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
          <div className="section-link"><Link to="/services">View all services <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Developed by ENASH Developers" title="Live systems created by our development team." text="These are working applications. Open them directly to see the current product experience." />
          <div className="projects-grid">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container delivery-simple-grid">
          <div>
            <span className="eyebrow">How we work</span>
            <h2>Start with the requirement. Build the right solution around it.</h2>
            <p>We keep the process simple: understand the problem, agree the scope, build the system, deploy it and support what happens next.</p>
          </div>
          <div className="delivery-simple-steps">
            {[
              ['01', 'Understand', 'Problem, users, outcome and constraints.'],
              ['02', 'Plan', 'Scope, workflow, technology and delivery path.'],
              ['03', 'Build', 'Interface, data, integrations and communication.'],
              ['04', 'Launch', 'Deploy, test, hand over and improve.'],
            ].map(([num, title, text]) => <div key={num}><span>{num}</span><strong>{title}</strong><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <CTA title="Have a project in mind?" text="Complete the request yourself or let ENASH Assistant help you shape the requirements first." />
    </>
  );
}
