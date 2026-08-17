import PageHero from '../components/PageHero';

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="How ENASH handles website information." text="This summary explains what we collect from forms on this website and how that information is used." />
      <section className="section">
        <div className="container legal-copy">
          <h2>Information submitted through forms</h2>
          <p>When you submit a project request, contact message or document request, ENASH stores the information required to respond and provide the requested service.</p>
          <h2>How information is used</h2>
          <p>Submitted information is used for communication, project qualification, procurement verification and service delivery. Information is not sold to third parties.</p>
          <h2>Security and access</h2>
          <p>Privileged operations are handled server-side. Access is limited to authorised personnel who require the data for operational and support purposes.</p>
        </div>
      </section>
    </>
  );
}
