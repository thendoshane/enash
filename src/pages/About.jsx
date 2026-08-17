import { Building2, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { company } from '../data/siteData';

export default function About() {
  return (
    <>
      <PageHero eyebrow="About ENASH" title="A small technology company built around practical delivery." text="ENASH is the customer-facing technology brand of INDESIGN AND DEVELOPERS (Pty) Ltd, a South African private company." />
      <section className="section">
        <div className="container about-simple-grid">
          <div className="about-story">
            <span className="eyebrow">What matters to us</span>
            <h2>Useful technology, clear communication and work that can actually be maintained.</h2>
            <p>We work across software, web, data, AI, cloud, automation and selected ICT sourcing. Projects can start small, but they should always start with a clear problem and a useful outcome.</p>
          </div>
          <div className="about-facts clean-facts">
            <div><CalendarDays /><span>Established</span><strong>2020</strong></div>
            <div><Building2 /><span>Legal entity</span><strong>{company.legalName}</strong></div>
            <div><ShieldCheck /><span>Status</span><strong>{company.status}</strong></div>
            <div><MapPin /><span>Based in</span><strong>Johannesburg, Gauteng</strong></div>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container values-grid">
          <article><span>01</span><h3>Understand before building</h3><p>Start with users, workflow and the outcome the system must create.</p></article>
          <article><span>02</span><h3>Keep scope understandable</h3><p>Separate what is necessary now from what can be added later.</p></article>
          <article><span>03</span><h3>Build securely</h3><p>Keep privileged operations server-side and avoid unnecessary exposure.</p></article>
          <article><span>04</span><h3>Support what goes live</h3><p>Deployment, fixes and improvement are part of delivery.</p></article>
        </div>
      </section>
      <CTA />
    </>
  );
}
