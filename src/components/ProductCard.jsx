import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductMiniVisual from './ProductMiniVisual';

export default function ProductCard({ product, featured = false }) {
  const Icon = product.icon;
  return (
    <article className={`product-card product-${product.accent} ${featured ? 'featured' : ''}`}>
      <ProductMiniVisual slug={product.slug} />
      <div className="product-card-body">
        <div className="product-card-head"><span className="product-icon"><Icon size={20} /></span><span className="status-dot"><i></i>{product.status}</span></div>
        <span className="product-eyebrow">{product.eyebrow}</span>
        <h3>{product.name}</h3>
        <p className="product-title">{product.title}</p>
        <p>{product.description}</p>
        <div className="product-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="product-card-actions"><Link to={`/products/${product.slug}`}>Explore product <ArrowRight size={14} /></Link><a href={product.url} target="_blank" rel="noreferrer">Open live <ExternalLink size={13} /></a></div>
      </div>
    </article>
  );
}
