import { ArrowRight, FileCheck2, PackageCheck, Search, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CTA from '../components/CTA';

export default function Procurement() {
  return (
    <>
      <PageHero eyebrow="Procurement & sourcing" title="ICT sourcing and delivery support." text="ENASH supports selected technology procurement requirements, sourcing and commercial responses where they fit our supplier scope." />
      <section className="section"><div className="container"><SectionHeading eyebrow="Procurement workflow" title="A clear path from specification to delivery." /><div className="procurement-steps">{[
        [Search, '01', 'Review the specification', 'Understand products, quantities, technical requirements, delivery and submission conditions.'],
        [PackageCheck, '02', 'Source suitable options', 'Compare credible supply options against specification, lead time and commercial fit.'],
        [FileCheck2, '03', 'Prepare the response', 'Structure the quotation and required commercial information.'],
        [Truck, '04', 'Coordinate fulfilment', 'Manage supplier communication and delivery coordination for accepted orders.'],
      ].map(([Icon, num, title, text]) => <article key={num}><span className="icon-box"><Icon size={22} /></span><small>{num}</small><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section section-soft"><div className="container split-section compact"><div><SectionHeading eyebrow="Supplier credentials" title="Formal company documents are available when needed." text="Procurement teams can request CIPC, B-BBEE and CSD documents by email from the Company Documents page." /><Link className="inline-action" to="/compliance">Request company documents <ArrowRight size={16} /></Link></div><div className="procurement-list"><strong>Useful request information</strong>{['Specification or RFQ document', 'Required quantity', 'Delivery location', 'Submission deadline', 'Mandatory documents', 'Brand / equivalent requirements'].map((item) => <span key={item}>{item}</span>)}</div></div></section>
      <CTA title="Have an ICT sourcing or RFQ requirement?" text="Send the requirement through the project request workflow." />
    </>
  );
}
