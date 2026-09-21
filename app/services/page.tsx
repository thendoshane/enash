import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Technology Services South Africa | Software, Web, AI & Cloud",
  description: "Affordable software development, websites, AI automation, cloud, data and MVP services for South African startups, small businesses and growing companies.",
  keywords: ["technology services South Africa", "affordable software development", "website development South Africa", "AI automation South Africa", "MVP development"],
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <><Header /><main>
      <section className="subpage-hero"><div className="container narrow"><div className="eyebrow">ENASH services</div><h1>Start with the business need. Build the right amount of technology.</h1><p className="hero-copy">We provide software, website, AI, cloud, data and MVP development for startups and growing organisations. Initial project consultations are free; implementation is scoped and quoted before work begins.</p></div></section>
      <section className="section"><div className="container"><div className="service-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></div></section>
      <section className="section soft-section"><div className="container text-grid"><div><div className="section-kicker">Not sure what service fits?</div><h2>Describe the outcome instead.</h2></div><div><p className="lead">You can request a project without choosing the technical solution. Tell us what the business needs to do, what is currently difficult and who will use it.</p><div className="actions"><a className="btn btn-dark" href="/request">Request a project</a></div></div></div></section>
    </main><Footer /></>
  );
}
