import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ENASH | South African Technology Company",
  description: "ENASH is a Johannesburg-based technology brand helping startups, new companies and growing teams build software, websites, AI, cloud and data solutions.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <><Header /><main>
      <section className="subpage-hero"><div className="container narrow"><div className="eyebrow">About ENASH</div><h1>Technology that stays practical from the first conversation.</h1><p className="hero-copy">ENASH is the customer-facing technology brand of {company.legalName}, a registered South African private company based in Johannesburg.</p></div></section>
      <section className="section"><div className="container editorial-grid"><div className="section-kicker">How we work</div><div className="editorial-copy"><h2>Clear scope. Useful first release. Room to grow.</h2><p>We work with founders, startups, new companies and teams that need a technology partner for a specific build or a longer product journey. A project can begin with a detailed brief, an existing product or only the business problem.</p><p>Our role is to turn that starting point into a sensible technical plan, build the agreed version, launch it properly and make the next step easier to understand.</p><div className="editorial-cards"><article><strong>South African</strong><span>Based in Johannesburg and able to work with organisations across South Africa.</span></article><article><strong>Product-minded</strong><span>We focus on what the technology must achieve for the users and business.</span></article><article><strong>Practical delivery</strong><span>Projects are scoped around useful outcomes instead of unnecessary features.</span></article></div></div></div></section>
      <section className="section dark-band"><div className="container band-layout"><div><div className="section-kicker light">Start a conversation</div><h2>Have an idea, an existing system or a process that needs work?</h2></div><div className="actions"><a className="btn btn-light" href="/request">Request a project</a><a className="btn btn-ghost-light" href="/contact">Contact ENASH</a></div></div></section>
    </main><Footer /></>
  );
}
