import { ArrowRight, Building2, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CTA from '../components/CTA';
import { capabilities, company } from '../data/siteData';

export default function About() {
  return (
    <>
      <PageHero eyebrow="About ENASH" title="A technology company focused on practical delivery." text="ENASH is the customer-facing technology brand of INDESIGN AND DEVELOPERS (Pty) Ltd, a South African private company.">
        <div className="hero-fact-card"><Building2 size={22} /><span>Company</span><strong>{company.legalName}</strong><small>Trading as ENASH</small></div>
      </PageHero>

      <section className="section">
        <div className="container about-grid">
          <div>
            <SectionHeading eyebrow="What we do" title="We help organisations turn requirements into working digital systems." text="ENASH works across software, websites, cloud, data, AI, automation, digital operations and technology sourcing." />
            <p className="body-large">Projects can start small and focused or grow into a broader platform. The approach stays the same: understand what needs to change, define a sensible scope, build the solution and support it after launch.</p>
          </div>
          <div className="about-facts">
            <div><CalendarDays /><span>Established</span><strong>2020</strong></div>
            <div><ShieldCheck /><span>Status</span><strong>Registered private company</strong></div>
            <div><Building2 /><span>Supplier profile</span><strong>CSD registered</strong></div>
            <div><MapPin /><span>Based in</span><strong>Johannesburg, Gauteng</strong></div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="How we approach work" title="Clear requirements, useful systems, maintainable delivery." />
          <div className="principles-grid">
            {[
              ['01', 'Understand first', 'Start with the users, the current problem and the outcome the project needs to create.'],
              ['02', 'Keep scope clear', 'Separate must-have requirements from ideas that can come later.'],
              ['03', 'Build securely', 'Keep secrets and privileged operations server-side and avoid unnecessary exposure.'],
              ['04', 'Design for use', 'Interfaces and workflows should be easy to understand and practical in day-to-day work.'],
              ['05', 'Communicate properly', 'Requests, project information and handover should be clear and traceable.'],
              ['06', 'Support what is live', 'Deployment and ongoing improvement are part of the delivery, not an afterthought.'],
            ].map(([num, title, text]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Core capability" title="Connected technology services instead of isolated pieces." />
          <div className="capability-cards">{capabilities.map((item) => { const Icon = item.icon; return <div key={item.title}><Icon size={24} /><h3>{item.title}</h3><p>{item.text}</p></div>; })}</div>
          <div className="section-link"><Link to="/services">Explore services <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <CTA title="Have a requirement to discuss?" text="Start a project manually or use ENASH Assistant to help structure it." />
    </>
  );
}
