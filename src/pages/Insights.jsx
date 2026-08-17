import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const insights = [
  {
    title: 'Starting small without limiting growth',
    text: 'Most projects begin with one painful workflow. Build that part first, then expand from a stable foundation.',
  },
  {
    title: 'AI where it supports real work',
    text: 'Useful AI projects focus on repetitive tasks and decision support, not novelty. Keep humans in the loop.',
  },
  {
    title: 'Procurement-ready digital delivery',
    text: 'Clear documentation, traceable requirements and secure cloud deployment reduce procurement and compliance friction.',
  },
];

export default function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Practical notes from ENASH delivery work." text="Brief observations from software, data and cloud projects delivered for real business outcomes." />
      <section className="section">
        <div className="container insights-grid">
          {insights.map((item, index) => (
            <article key={item.title}>
              <span className="insight-number">INSIGHT 0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <small>ENASH perspective <ArrowUpRight size={13} /></small>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
