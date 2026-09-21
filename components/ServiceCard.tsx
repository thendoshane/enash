import type { Service } from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-number">{service.number}</span>
        <span className="service-arrow" aria-hidden="true">↗</span>
      </div>
      <h3>{service.shortTitle}</h3>
      <p>{service.cardDescription}</p>
      <div className="service-actions">
        <a className="service-link" href={`/services/${service.slug}`}>Read more</a>
        <a className="service-link service-link-dark" href={`/request?service=${service.slug}`}>Request</a>
      </div>
    </article>
  );
}
