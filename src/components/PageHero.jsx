export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
        {children && <div className="page-hero-aside">{children}</div>}
      </div>
    </section>
  );
}
