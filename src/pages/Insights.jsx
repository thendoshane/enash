import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { insightPosts } from '../data/insights';

export default function Insights() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking on software, AI, cloud, data and digital delivery."
        text="Useful ENASH guides for organisations planning technology projects in South Africa and teams working with us remotely."
      />
      <section className="section">
        <div className="container insights-grid">
          {insightPosts.map((post, index) => (
            <article key={post.slug}>
              <span className="insight-number">0{index + 1}</span>
              <small>{post.category}</small>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Link to={`/insights/${post.slug}`}>Read article <ArrowRight size={15} /></Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
