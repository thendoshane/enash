import PageHero from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import CTA from '../components/CTA';
import { projects } from '../data/siteData';

export default function Projects() {
  return (
    <>
      <PageHero eyebrow="Developed by ENASH Developers" title="Systems our developers have built." text="A selection of live ENASH-developed applications across operations, mobility and local discovery." />
      <section className="section project-page-section">
        <div className="container projects-grid">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </section>
      <section className="section section-soft">
        <div className="container portfolio-note">
          <span className="eyebrow">Our development work</span>
          <h2>Different problems, different products, one development team.</h2>
          <p>ENASH Developers builds systems around the needs of each project rather than forcing every client into the same template or platform.</p>
        </div>
      </section>
      <CTA title="Need our developers to build something for you?" text="Send your requirement manually or use ENASH Assistant to help define it first." />
    </>
  );
}
