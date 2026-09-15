import { Building2, CalendarDays, CheckCircle2, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import { company, products } from '../data/siteData';

export default function Company() {
  return <>
    <PageHero eyebrow="Company" title="The registered company behind ENASH." text="ENASH is the technology product brand operated by INDESIGN AND DEVELOPERS (PTY) LTD, a South African private company." side={<div className="company-badge"><CheckCircle2 size={22}/><span>Registered entity</span><strong>South Africa</strong></div>}/>
    <section className="section"><div className="container company-record"><div className="company-record-head"><span className="eyebrow">Company record</span><h2>{company.legalName}</h2><p>Trading publicly as ENASH.</p></div><dl><div><dt>Trading brand</dt><dd>ENASH</dd></div><div><dt>Registration number</dt><dd>{company.registrationNumber}</dd></div><div><dt>Registration date</dt><dd>{company.registrationDate}</dd></div><div><dt>Company type</dt><dd>{company.companyType}</dd></div><div><dt>Company status</dt><dd>{company.status}</dd></div><div><dt>Location</dt><dd>{company.address}</dd></div><div><dt>Products shown on this site</dt><dd>{products.map((item)=>item.name).join(', ')}</dd></div></dl></div></section>
    <section className="section section-soft"><div className="container company-proof-grid"><article><Building2/><h3>Registered entity</h3><p>The product brand operates through a registered South African private company.</p></article><article><CheckCircle2/><h3>Product ownership</h3><p>The products presented on this website are technology developed under ENASH.</p></article><article><CalendarDays/><h3>Established 2020</h3><p>The underlying company was registered in July 2020.</p></article><article><MapPin/><h3>South African</h3><p>ENASH is based in Johannesburg, Gauteng.</p></article></div></section>
  </>;
}
