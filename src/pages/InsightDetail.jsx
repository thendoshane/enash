import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { insightPosts } from '../data/insights';

export default function InsightDetail() {
  const { slug } = useParams();
  const post = insightPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="container not-found-inline">
        <h1>Insight not found</h1>
        <Link to="/insights">Back to insights</Link>
      </div>
    );
  }

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} text={post.description} />
      <article className="section article-section">
        <div className="container article-layout">
          <div className="article-main">
            <Link className="back-link" to="/insights"><ArrowLeft size={15} /> All insights</Link>
            <div className="article-meta"><span>{post.datePublished}</span><span>{post.readTime}</span><span>ENASH</span></div>
            <p className="article-intro">{post.intro}</p>
            {post.sections.map(([heading, text]) => (
              <section key={heading} className="article-content-section">
                <h2>{heading}</h2>
                <p>{text}</p>
              </section>
            ))}
          </div>
          <aside className="article-aside">
            <span className="eyebrow">Need help with this?</span>
            <h3>Turn the idea into a practical requirement.</h3>
            <p>ENASH can help scope software, AI, cloud, data, automation and ICT requirements for organisations in South Africa and remote clients.</p>
            <Link className="btn btn-primary" to="/request-service">Start a project <ArrowRight size={16} /></Link>
          </aside>
        </div>
      </article>
      <CTA title="Planning a technology project?" text="Tell ENASH the problem, users and outcome. We can help turn it into a clear scope." />
    </>
  );
}
