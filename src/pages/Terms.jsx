import PageHero from '../components/PageHero';

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Website terms of use." text="By using this website, you agree to use it lawfully and to provide accurate information when submitting forms." />
      <section className="section">
        <div className="container legal-copy">
          <h2>Use of content</h2>
          <p>Website content is provided for general information about ENASH services and developed systems. It may be updated without notice.</p>
          <h2>Project and procurement enquiries</h2>
          <p>Submitting a form does not create a binding service agreement. Formal terms are confirmed in project quotations, statements of work or contracts.</p>
          <h2>External links</h2>
          <p>Some pages include links to third-party websites. ENASH is not responsible for external content, uptime or privacy practices.</p>
        </div>
      </section>
    </>
  );
}
