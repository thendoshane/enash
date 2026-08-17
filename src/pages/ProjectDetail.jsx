import { ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { projects } from '../data/siteData';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="not-found-inline">
        <div>
          <span>Project not found</span>
          <h1>This project page is unavailable.</h1>
          <p>Browse all developed systems to explore live products by ENASH.</p>
          <Link className="btn btn-primary" to="/projects">View projects</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Developed system" title={project.title} text={project.description} />
      <section className="section">
        <div className="container project-detail-grid">
          <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className="project-tags large">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          <aside className="project-live-panel">
            <span className="eyebrow">Live product</span>
            <h3>{project.name}</h3>
            <p>This system is available online and can be accessed directly.</p>
            <a className="btn btn-primary" href={project.url} target="_blank" rel="noreferrer">Open live site <ExternalLink size={15} /></a>
          </aside>
        </div>
      </section>
      <CTA title="Build a product like this" text="Let ENASH help you scope and deliver your own digital product." />
    </>
  );
}
