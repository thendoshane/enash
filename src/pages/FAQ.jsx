import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import { faqs } from '../data/siteData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageHero eyebrow="FAQ" title="Common questions about working with ENASH." text="Quick answers to the questions clients ask before starting a project." />
      <section className="section">
        <div className="container faq-wrap">
          {faqs.map(([question, answer], index) => {
            const open = openIndex === index;
            return (
              <article className="faq-item" key={question}>
                <button onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open}>
                  <span>{question}</span>
                  <ChevronDown size={18} />
                </button>
                {open && <p>{answer}</p>}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
