import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ProjectRequestForm from "@/components/ProjectRequestForm";
import { services } from "@/lib/services";
import { company, siteUrl } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ENASH",
    url: siteUrl,
    telephone: company.phone,
    email: company.email,
    areaServed: { "@type": "Country", name: "South Africa" },
    description: "Software, website, AI, cloud, data and MVP development for startups, new companies and growing businesses in South Africa.",
    priceRange: "Free initial consultation; project pricing by scope",
  };

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="eyebrow">Technology for startups, new companies & growing teams</div>
            <h1>Build what your business needs next.</h1>
            <p className="hero-copy">ENASH designs and develops software, websites, AI automation, cloud systems and digital products in South Africa — with a free initial project consultation and practical scopes for growing businesses.</p>
            <div className="actions hero-actions">
              <a className="btn btn-dark" href="#services">Explore services</a>
              <a className="btn btn-outline" href="/request">Request a project</a>
            </div>
            <div className="hero-proof" aria-label="ENASH project approach">
              <span>Johannesburg · South Africa</span>
              <span>Startup-friendly scopes</span>
              <span>Manual or AI-assisted project request</span>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container">
            <div className="section-heading compact-heading">
              <div className="section-kicker">About ENASH</div>
              <h2>A practical technology partner from idea to launch.</h2>
              <p className="lead">ENASH is the customer-facing technology brand of {company.legalName}. We work with founders, startups, new companies and established teams that need technology designed, built, fixed or improved without unnecessary complexity.</p>
            </div>
            <div className="value-grid">
              <article><span>01</span><h3>Start with the problem</h3><p>You do not need a finished specification. Bring the business problem, process or idea and we can shape a sensible first scope.</p></article>
              <article><span>02</span><h3>Build the useful version</h3><p>We prioritise the part that creates value now, then leave room for the product to grow instead of overbuilding the first release.</p></article>
              <article><span>03</span><h3>Stay after launch</h3><p>Projects can continue with support, improvements, analytics, automation or the next release when the business is ready.</p></article>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading split-heading">
              <div><div className="section-kicker">Services</div><h2>Technology services that can start small and grow.</h2></div>
              <p className="lead">Each service has a detailed page covering what is included, technologies, project steps, indicative pricing and the direct request process.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
            </div>
          </div>
        </section>

        <section className="section request-section" id="contact">
          <div className="container request-layout">
            <div className="request-copy">
              <div className="section-kicker">Request a project</div>
              <h2>Tell us what you want to build.</h2>
              <p className="lead">Choose the service, then prepare the request manually or use the ENASH AI assistant to turn a rough idea into a clearer project brief.</p>
              <div className="request-points"><span>Free initial scope review</span><span>No finished specification required</span><span>South African startup and company focus</span></div>
            </div>
            <ProjectRequestForm />
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
