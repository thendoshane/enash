export default function PageHero({ eyebrow, title, text, side }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>
        {side && <div className="page-hero-side">{side}</div>}
      </div>
    </section>
  );
}
