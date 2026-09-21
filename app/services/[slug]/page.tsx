import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getService, services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.seoTitle} | ENASH`, description: service.seoDescription, url: `${siteUrl}/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.seoDescription,
      url: `${siteUrl}/services/${service.slug}`,
      areaServed: { "@type": "Country", name: "South Africa" },
      provider: { "@type": "Organization", name: "ENASH", url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/services/${service.slug}` },
      ],
    },
  ];

  return (
    <><Header /><main>
      <section className="service-hero"><div className="container"><a className="back-link" href="/services">← All services</a><div className="service-hero-grid"><div><div className="eyebrow">{service.number} · {service.title}</div><h1>{service.hero}</h1></div><div className="service-hero-side"><p className="lead">{service.intro}</p><div className="actions"><a className="btn btn-dark" href={`/request?service=${service.slug}`}>Request this service</a><a className="btn btn-outline" href="#pricing">See pricing</a></div></div></div></div></section>

      <section className="section"><div className="container detail-two-col"><div><div className="section-kicker">Good fit for</div><h2>Where this service is useful.</h2></div><ul className="feature-list">{service.bestFor.map((item) => <li key={item}>{item}</li>)}</ul></div></section>

      <section className="section soft-section"><div className="container"><div className="section-heading split-heading"><div><div className="section-kicker">What is included</div><h2>Typical project deliverables.</h2></div><p className="lead">The final scope depends on the project. These are the common building blocks used to create a complete, handover-ready result.</p></div><div className="deliverable-grid">{service.deliverables.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>)}</div></div></section>

      <section className="section"><div className="container detail-two-col"><div><div className="section-kicker">Technologies & products</div><h2>Tools selected to fit the project.</h2><p className="body-copy">We do not force every project into the same stack. These are technologies commonly used where they fit the requirement, existing environment and budget.</p></div><div className="tag-list">{service.technologies.map((item) => <span key={item}>{item}</span>)}</div></div></section>

      <section className="section process-section"><div className="container"><div className="section-heading compact-heading"><div className="section-kicker">Project process</div><h2>From request to working result.</h2></div><div className="process-list">{service.steps.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div></div></section>

      <section className="section" id="pricing"><div className="container"><div className="section-heading split-heading"><div><div className="section-kicker">Indicative pricing</div><h2>Start with a scope that fits the stage of the business.</h2></div><p className="lead">These are starting guides, not fixed quotations. Final pricing depends on features, integrations, data, design and delivery requirements.</p></div><div className="pricing-grid">{service.pricing.map((tier) => <article key={tier.label}><span>{tier.label}</span><strong>{tier.price}</strong><p>{tier.note}</p></article>)}</div><p className="timeline-note"><strong>Typical timing:</strong> {service.timeline}</p></div></section>

      <section className="section soft-section"><div className="container faq-layout"><div><div className="section-kicker">Questions</div><h2>Before you request.</h2></div><div className="faq-list">{service.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>

      <section className="section dark-band"><div className="container band-layout"><div><div className="section-kicker light">Request {service.shortTitle}</div><h2>Ready to turn this into a scoped project?</h2><p>Choose manual or AI-assisted discovery. The selected service will already be loaded into the request form.</p></div><div className="actions"><a className="btn btn-light" href={`/request?service=${service.slug}`}>Request this service</a></div></div></section>
    </main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></>
  );
}
