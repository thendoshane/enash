import PageHero from '../components/PageHero';

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Website privacy notice." text="How information submitted through ENASH website forms is handled." />
      <section className="section"><div className="container legal-copy">
        <h2>Information we collect</h2><p>When you submit a contact or service request, the website may collect your name, organisation, email address, phone number, project information and any reference link you provide.</p>
        <h2>Why we use it</h2><p>The information is used to respond to your enquiry, evaluate a requested service, prepare follow-up communication and maintain a record of business enquiries.</p>
        <h2>How the website processes it</h2><p>Public forms are sent to server-side Firebase Cloud Functions. The functions can store the request in Firestore and send email notifications through Resend. API keys and privileged service credentials are kept on the server side rather than embedded in the browser application.</p>
        <h2>AI assistant</h2><p>If the ENASH AI assistant is configured, messages sent to it are processed through the configured Microsoft Azure OpenAI / Foundry endpoint to generate project guidance. Do not submit passwords, identity documents, banking details or other secrets through the assistant.</p>
        <h2>Retention and contact</h2><p>Business enquiry records should be retained only as long as needed for legitimate business and legal purposes. You may contact ENASH through the Contact page regarding personal information submitted through the website.</p>
      </div></section>
    </>
  );
}
