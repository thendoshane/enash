import { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import { submitContactMessage } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [state, setState] = useState({ loading: false, error: '', sent: false, reference: '', confirmed: false, notice: '' });
  const update = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, error: '', sent: false, reference: '', confirmed: false, notice: '' });
    try {
      const data = await submitContactMessage(form);
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
      setState({
        loading: false,
        error: '',
        sent: true,
        reference: data.reference || '',
        confirmed: Boolean(data.confirmationEmailSent),
        notice: data.emailNotice || '',
      });
    } catch (error) {
      setState({ loading: false, error: error?.message || 'Could not send your message.', sent: false, reference: '', confirmed: false, notice: '' });
    }
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to ENASH." text="Use this form for general questions. For a project or quotation request, use Start a Project so we can capture the requirement properly." />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Contact ENASH</span>
            <h2>One place for general enquiries.</h2>
            <p>Your message is recorded and routed to the ENASH business inbox for follow-up.</p>
            <div className="contact-info-row"><MapPin size={20} /><div><span>Based in</span><strong>Johannesburg, Gauteng, South Africa</strong></div></div>
            <div className="contact-info-row"><Mail size={20} /><div><span>Email workflow</span><strong>Messages submitted here are delivered through the ENASH mail service.</strong></div></div>
          </div>

          <form className="enash-form compact-form" onSubmit={submit}>
            {state.sent && <div className="form-success-inline"><CheckCircle2 size={18} /> Message received. Reference {state.reference}.</div>}
            {state.sent && state.confirmed && <div className="form-success-inline"><CheckCircle2 size={18} /> A confirmation email was sent to you.</div>}
            {state.sent && !state.confirmed && state.notice && <div className="form-notice">{state.notice}</div>}
            <div className="form-grid two">
              <label>Name *<input name="name" value={form.name} onChange={update} required maxLength={120} /></label>
              <label>Email *<input name="email" type="email" value={form.email} onChange={update} required maxLength={180} /></label>
            </div>
            <label>Subject *<input name="subject" value={form.subject} onChange={update} required maxLength={180} /></label>
            <label>Message *<textarea name="message" value={form.message} onChange={update} required minLength={10} maxLength={4000} rows={8} /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" /></label>
            {state.error && <div className="form-error">{state.error}</div>}
            <button className="btn btn-primary btn-lg" disabled={state.loading}>{state.loading ? 'Sending…' : <>Send message <Send size={17} /></>}</button>
          </form>
        </div>
      </section>
    </>
  );
}
