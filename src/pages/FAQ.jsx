import PageHero from '../components/PageHero';
import { faqs } from '../data/siteData';
export default function FAQ(){return <><PageHero eyebrow="FAQ" title="A few useful answers." text="Quick information about ENASH, the company and the technology shown on this website."/><section className="section"><div className="container faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section></>}
