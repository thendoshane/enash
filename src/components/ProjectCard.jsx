import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="status-pill"><i /> {project.label}</span>
        <a className="project-live-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="project-card-body">
        <h3>{project.name}</h3>
        <p className="project-title">{project.title}</p>
        <p>{project.description}</p>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="project-actions">
        <Link to={`/projects/${project.slug}`}>Details <ArrowRight size={15} /></Link>
        <a href={project.url} target="_blank" rel="noreferrer">Open live <ExternalLink size={14} /></a>
      </div>
    </article>
  );
}
