import CTA from '../components/CTA';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/siteData';

export default function Products() {
  return <>
    <PageHero eyebrow="ENASH portfolio" title="Products we own, operate and keep improving." text="From AI productivity to local mobility, ENASH is building a portfolio around practical problems and repeatable product use." side={<div className="hero-counter"><strong>04</strong><span>public products</span></div>} />
    <section className="section"><div className="container products-grid products-page-grid">{products.map((product)=><ProductCard key={product.slug} product={product} featured />)}</div></section>
    <section className="section section-soft"><div className="container portfolio-note"><span className="eyebrow">The common thread</span><h2>Different categories. The same product discipline.</h2><p>Every ENASH product is built around company ownership, a clear user problem, a working product experience and continuous iteration. Where a deployed product exists, we link directly to it so visitors can explore the current experience.</p></div></section>
    <CTA title="Interested in one of the products?" text="Talk to ENASH about product feedback, integration ideas, partnerships, investment or other company matters." />
  </>;
}
