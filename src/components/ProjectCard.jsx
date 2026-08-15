import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="status-pill"><i /> Developed by ENASH Developers</span>
        <a className="project-live-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ExternalLink size={16} /></a>
      </div>
      <div>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h3>{project.name}</h3>
        <p className="project-title">{project.title}</p>
        <p>{project.description}</p>
      </div>
      <div className="project-actions">
        <Link to={`/projects/${project.slug}`}>View project <ArrowRight size={16} /></Link>
        <a href={project.url} target="_blank" rel="noreferrer">Open live system <ExternalLink size={15} /></a>
      </div>
    </article>
  );
}
