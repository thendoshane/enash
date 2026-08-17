import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <Link className="service-card" to={`/services/${service.slug}`}>
      <span className="icon-box"><Icon size={21} /></span>
      <div>
        <h3>{service.title}</h3>
        <p>{service.short}</p>
      </div>
      <span className="card-link">Learn more <ArrowRight size={15} /></span>
    </Link>
  );
}
