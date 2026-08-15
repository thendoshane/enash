import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { projects } from '../data/siteData';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <div className="container not-found-inline"><h1>Project not found</h1><Link to="/projects">Back to developed systems</Link></div>;

  return (
    <>
      <PageHero eyebrow="Developed by ENASH Developers" title={project.name} text={project.title}>
        <div className="live-url-card"><span>Live system</span><strong>{project.displayUrl}</strong><a href={project.url} target="_blank" rel="noreferrer">Open application <ExternalLink size={15} /></a></div>
      </PageHero>
      <section className="section">
        <div className="container project-detail-grid">
          <div>
            <Link className="back-link" to="/projects"><ArrowLeft size={15} /> All developed systems</Link>
            <span className="status-pill"><i /> Developed by ENASH Developers</span>
            <h2>About this system</h2>
            <p className="body-large">{project.description}</p>
            <div className="project-tags large">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          <aside className="project-live-panel"><span className="eyebrow">Open the system</span><h3>See the current live application.</h3><p>Open it in a new tab to view the current user experience.</p><a className="btn btn-primary" href={project.url} target="_blank" rel="noreferrer">Open {project.name} <ExternalLink size={16} /></a></aside>
        </div>
      </section>
      <CTA title="Need ENASH Developers to build your system?" text="Describe what you need, or use ENASH Assistant to help structure the requirement." />
    </>
  );
}
