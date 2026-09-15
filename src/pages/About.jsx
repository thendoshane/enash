import { ArrowRight, Building2, Cpu, MapPin, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import PageHero from '../components/PageHero';
import { company, principles } from '../data/siteData';

export default function About() {
  return <>
    <PageHero eyebrow="About ENASH" title="A technology company building from South Africa." text="ENASH is the product brand of a registered South African private company. We build technology we own, operate and continue improving." side={<img className="about-mark" src="/brand-mark.svg" alt="ENASH brand mark"/>}/>
    <section className="section"><div className="container about-grid"><div><span className="eyebrow">What ENASH is</span><h2>We turn practical problems into software people can actually use.</h2><p className="body-large">ENASH is the technology brand of {company.legalName}. Our work currently spans AI productivity, South African mobility, kitchen operations and local discovery.</p><p className="body-large">The common approach is simple: build a usable version, operate it, learn what works and keep improving the same product rather than treating technology as a once-off delivery.</p></div><div className="about-facts"><article><Building2/><span>Company</span><strong>Registered private company</strong></article><article><Rocket/><span>Direction</span><strong>Product development and operation</strong></article><article><Cpu/><span>Technology</span><strong>Software and cloud products</strong></article><article><MapPin/><span>Based in</span><strong>Johannesburg, Gauteng</strong></article></div></div></section>
    <section className="section build-section"><div className="container"><div className="section-heading split light"><div><span className="eyebrow light">How we work</span><h2>Simple rules for building useful technology.</h2></div><p>These principles keep our decisions grounded in ownership, real user problems and continuous improvement.</p></div><div className="principle-cards">{principles.map(([title,text],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section"><div className="container timeline"><div><span className="eyebrow">Current direction</span><h2>Build, operate, learn, improve.</h2></div><div className="timeline-copy"><p>Visitors can open each product directly from the ENASH home page, explore a simplified live preview and then open the deployed product where one is available.</p><Link to="/">See what we're building <ArrowRight size={15}/></Link></div></div></section>
    <CTA/>
  </>;
}
