import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import { faqs } from '../data/siteData';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero eyebrow="FAQ" title="Common questions about working with ENASH." text="Quick answers about services, projects, support and procurement." />
      <section className="section">
        <div className="container faq-wrap">
          {faqs.map(([question, answer], index) => <article className={`faq-item ${open === index ? 'open' : ''}`} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><ChevronDown size={20} /></button>{open === index && <p>{answer}</p>}</article>)}
        </div>
      </section>
      <CTA title="Still have a question?" text="Use the contact form for a general question or submit a service request for project-specific work." />
    </>
  );
}
