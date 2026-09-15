import { ArrowLeft, ExternalLink, Target } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import CTA from '../components/CTA';
import ProductExperience from '../components/ProductExperience';
import { products } from '../data/siteData';
import NotFound from './NotFound';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item)=>item.slug===slug || (slug==='kitchen-manager'&&item.slug==='kitchcore'));
  if (!product) return <NotFound/>;
  const Icon = product.icon;

  return <>
    <section className={`product-detail-hero detail-${product.accent}`}>
      <div className="container product-detail-hero-grid">
        <div>
          <Link className="back-link" to="/"><ArrowLeft size={15}/> Back to ENASH</Link>
          <span className="product-eyebrow">{product.eyebrow}</span>
          <h1>{product.name}</h1>
          <p>{product.title}</p>
          <div className="hero-actions"><a className="btn btn-dark btn-lg" href={product.url} target="_blank" rel="noreferrer">Open live product <ExternalLink size={16}/></a><span className="detail-status"><i></i>{product.status}</span></div>
        </div>
        <div className="detail-brand-card"><span><Icon size={34}/></span><b>Built by ENASH</b><small>{product.audience}</small></div>
      </div>
    </section>

    <section className="section">
      <div className="container product-story-grid">
        <div className="product-story-copy">
          <span className="eyebrow">Overview</span>
          <h2>{product.storyTitle}</h2>
          {product.story.map((paragraph)=><p className="body-large" key={paragraph}>{paragraph}</p>)}
        </div>
        <aside className="problem-card"><Target size={23}/><span>The problem</span><p>{product.problem}</p><hr/><span>How the product responds</span><p>{product.approach}</p></aside>
      </div>
    </section>

    <section className="section section-soft">
      <div className="container experience-heading"><div><span className="eyebrow">{product.previewLabel}</span><h2>Try a simplified preview.</h2></div><p>{product.previewText}</p></div>
      <div className="container"><ProductExperience slug={product.slug}/></div>
    </section>

    <section className="section">
      <div className="container capability-section">
        <div className="capability-heading"><span className="eyebrow">Inside {product.name}</span><h2>{product.capabilityTitle}</h2><p>{product.capabilityIntro}</p></div>
        <div className="capability-grid">{product.capabilities.map((item)=><article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </section>

    <section className="section product-meta-section"><div className="container product-meta"><div><span>Status</span><strong>{product.status}</strong></div><div><span>Built by</span><strong>ENASH</strong></div><div><span>For</span><strong>{product.audience}</strong></div><div><span>Live URL</span><a href={product.url} target="_blank" rel="noreferrer">{product.displayUrl}</a></div></div></section>
    <CTA title={`Have feedback on ${product.name}?`} text="Share feedback, discuss the product or contact ENASH about partnership and company matters." />
  </>;
}
