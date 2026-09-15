import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import { principles, products } from '../data/siteData';

export default function Home() {
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="brand-dots"><i></i><i></i><i></i><i></i></span> South African technology product company</div>
          <h1>Practical products, <span className="scribble">built to keep getting better.</span></h1>
          <p>ENASH develops and operates practical software across artificial intelligence, mobility, operations and local discovery.</p>
          <div className="hero-actions"><Link className="btn btn-dark btn-lg" to="/about">About ENASH <ArrowRight size={17}/></Link><Link className="btn btn-outline btn-lg" to="/company">Company details <ArrowRight size={17}/></Link></div>
          <div className="hero-proof"><span><CheckCircle2 size={15}/> ENASH-owned technology</span><span><CheckCircle2 size={15}/> Working product experiences</span><span><CheckCircle2 size={15}/> Built from Johannesburg</span></div>
        </div>
        <div className="hero-stage" id="products">
          <div className="stage-note"><Sparkles size={16}/><span>Explore what we're building</span></div>
          <div className="stage-grid">{products.map((product,index)=>{const Icon=product.icon;return <Link to={`/products/${product.slug}`} className={`stage-product stage-${product.accent}`} key={product.slug}><div><span>0{index+1}</span><Icon size={20}/></div><strong>{product.name}</strong><small>{product.stageLine}</small><ArrowRight size={15}/></Link>})}</div>
        </div>
      </div>
    </section>

    <section className="section build-section">
      <div className="container build-grid"><div className="build-sticky"><span className="eyebrow light">How ENASH builds</span><h2>We build for use, not for display.</h2><p>That means releasing working versions, learning from how people use them and improving the same products over time instead of treating each release as a one-off.</p><Link to="/about">How we work <ArrowRight size={15}/></Link></div><div className="principles-list">{principles.map(([title,text],index)=><article key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
    </section>

    <section className="section proof-section"><div className="container proof-board"><div><span className="eyebrow">Built in South Africa</span><h2>A registered technology company building for real everyday use.</h2></div><div className="proof-items"><article><b>2020</b><span>Registered company</span></article><article><b>SA</b><span>South African technology</span></article><article><b>ENASH</b><span>Owned technology</span></article><article><b>JHB</b><span>Johannesburg, Gauteng</span></article></div><p className="proof-note">Company information and current product status are available across the site.</p></div></section>
    <CTA />
  </>;
}
