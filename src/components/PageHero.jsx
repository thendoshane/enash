export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        {children && <div className="page-hero-aside">{children}</div>}
      </div>
    </section>
  );
}
