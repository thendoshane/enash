import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const posts = [
  ['Product thinking', 'From manual workflow to digital system', 'A simple way to map people, steps, information and approvals before writing code.'],
  ['AI & automation', 'Where AI helps — and where normal automation is better', 'Use AI for interpretation and flexible reasoning; use deterministic workflows for rules that must behave the same way every time.'],
  ['Cloud delivery', 'Why client-facing forms should not expose API secrets', 'Public web apps can call server-side functions so communication services, AI keys and privileged database access stay outside the browser.'],
  ['Procurement', 'What makes a technology quotation easier to evaluate', 'Clear specifications, product equivalence, delivery terms, validity and supplier credentials reduce ambiguity for both buyer and supplier.'],
  ['Data', 'Start analytics with the decision, not the dashboard', 'A dashboard becomes useful when each metric is connected to a decision, threshold or action.'],
  ['Delivery', 'Build the smallest release that proves the workflow', 'A focused first release can validate the users, data and operating model before larger investment.'],
];

export default function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Short practical thinking on building and operating digital systems." text="ENASH uses this section to explain delivery choices in plain language — useful for clients planning a project or evaluating an approach." />
      <section className="section">
        <div className="container insights-grid">
          {posts.map(([category, title, text], index) => <article key={title}><span className="insight-number">0{index + 1}</span><small>{category}</small><h3>{title}</h3><p>{text}</p><Link to="/request-service">Apply this to a project <ArrowRight size={15} /></Link></article>)}
        </div>
      </section>
    </>
  );
}
