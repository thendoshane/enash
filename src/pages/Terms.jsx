import PageHero from '../components/PageHero';

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Website terms of use." text="Basic terms for using the public ENASH website and sending service enquiries." />
      <section className="section"><div className="container legal-copy">
        <h2>Website information</h2><p>Website content describes ENASH capabilities, systems developed by ENASH and company information for general business purposes. A website description is not a binding quotation, contract or guaranteed delivery commitment.</p>
        <h2>Service requests</h2><p>Submitting a service request starts a business enquiry. Scope, price, timing, assumptions and delivery terms only become binding when agreed in a separate written quotation, statement of work, purchase order or contract.</p>
        <h2>Developed system links</h2><p>Live project links are provided to demonstrate current ENASH-developed applications. Availability and functionality may change as those applications are updated.</p>
        <h2>Acceptable use</h2><p>Do not misuse forms, attempt to interfere with the website, submit malicious payloads or use the site to send unlawful content.</p>
        <h2>Intellectual property</h2><p>ENASH branding, original website content and project materials remain subject to applicable ownership and licensing arrangements. Third-party product names, platforms and trademarks remain the property of their respective owners.</p>
      </div></section>
    </>
  );
}
