import PageHero from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import CTA from '../components/CTA';
import { projects } from '../data/siteData';

export default function Projects() {
  return (
    <>
      <PageHero eyebrow="Developed systems" title="Products built by ENASH Developers." text="A small set of working systems that show the kind of product and platform work ENASH can deliver." />
      <section className="section">
        <div className="container projects-grid projects-page-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      </section>
      <CTA title="Need your own system?" text="Bring the requirement. We will help turn it into a clear project." />
    </>
  );
}
