import { ArrowRight, FileCheck2, PackageCheck, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';

export default function Procurement() {
  return (
    <>
      <PageHero eyebrow="Procurement" title="ICT sourcing without the clutter." text="Send the specification or RFQ. ENASH can assess fit, source suitable options and prepare a structured commercial response." />
      <section className="section">
        <div className="container procurement-steps simple-procurement">
          {[
            [Search, '01', 'Review', 'Check the specification, quantities, submission rules and delivery conditions.'],
            [PackageCheck, '02', 'Source', 'Find suitable products or suppliers and compare technical and commercial fit.'],
            [FileCheck2, '03', 'Respond', 'Prepare the quotation and supporting supplier information required for submission.'],
          ].map(([Icon, number, title, text]) => <article key={number}><span className="icon-box"><Icon size={21} /></span><small>{number}</small><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className="section section-soft">
        <div className="container split-section compact">
          <div><span className="eyebrow">Supplier documents</span><h2>Need ENASH company documents?</h2><p>Registration, B-BBEE and CSD documents are not exposed publicly. Request the documents you need and receive them by email.</p></div>
          <div className="prompt-card"><strong>For RFQs and supplier onboarding</strong><p>Use the company document request page for formal verification documents.</p><Link to="/compliance">Request documents <ArrowRight size={15} /></Link></div>
        </div>
      </section>
      <CTA title="Have an RFQ or sourcing requirement?" text="Send the specification through Start a Project and select procurement / RFQ as the project stage." />
    </>
  );
}
