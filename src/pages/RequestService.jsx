import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import { services } from '../data/siteData';
import { submitServiceRequest } from '../lib/api';

export default function RequestService() {
  const [form, setForm] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    projectStage: '',
    title: '',
    description: '',
    referenceUrl: '',
    consent: false,
    website: '',
  });
  const [state, setState] = useState({ loading: false, error: '', sent: false, reference: '', confirmed: false, notice: '' });

  function update(event) {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  }

  async function submit(event) {
    event.preventDefault();
    setState({ loading: true, error: '', sent: false, reference: '', confirmed: false, notice: '' });
    try {
      const data = await submitServiceRequest(form);
      setState({ loading: false, error: '', sent: true, reference: data.reference || '', confirmed: Boolean(data.confirmationEmailSent), notice: data.emailNotice || '' });
      setForm({ name: '', organisation: '', email: '', phone: '', service: '', budget: '', timeline: '', projectStage: '', title: '', description: '', referenceUrl: '', consent: false, website: '' });
    } catch (error) {
      setState({ loading: false, error: error?.message || 'Could not submit your service request.', sent: false, reference: '', confirmed: false, notice: '' });
    }
  }

  return (
    <>
      <PageHero eyebrow="Start a project" title="Send your requirement directly to ENASH." text="Share your project goals, timeline and scope. We will respond with next steps using your reference number." />
      <section className="section request-section">
        <div className="container request-grid">
          <aside className="request-side-card">
            <span className="eyebrow">What to include</span>
            <h3>Clear requirements help us respond faster.</h3>
            <p>Describe the business problem, expected outcome, key users and any deadlines or budget boundaries.</p>
          </aside>
          <form className="enash-form compact-form" onSubmit={submit}>
            <h2>Project request form</h2>
            {state.sent && <div className="form-success-inline"><CheckCircle2 size={18} /> Request received. Reference {state.reference}.</div>}
            {state.sent && state.confirmed && <div className="form-success-inline"><CheckCircle2 size={18} /> Confirmation email sent.</div>}
            {state.sent && !state.confirmed && state.notice && <div className="form-notice">{state.notice}</div>}
            <div className="form-grid two">
              <label>Full name *<input name="name" value={form.name} onChange={update} required maxLength={120} /></label>
              <label>Organisation<input name="organisation" value={form.organisation} onChange={update} maxLength={160} /></label>
            </div>
            <div className="form-grid two">
              <label>Email *<input name="email" type="email" value={form.email} onChange={update} required maxLength={180} /></label>
              <label>Phone<input name="phone" value={form.phone} onChange={update} maxLength={40} /></label>
            </div>
            <label>Service needed *
              <select name="service" value={form.service} onChange={update} required>
                <option value="">Select a service</option>
                {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
              </select>
            </label>
            <div className="form-grid two">
              <label>Budget range<input name="budget" value={form.budget} onChange={update} maxLength={80} placeholder="e.g. R50,000 - R150,000" /></label>
              <label>Timeline<input name="timeline" value={form.timeline} onChange={update} maxLength={80} placeholder="e.g. 6-8 weeks" /></label>
            </div>
            <label>Project stage<input name="projectStage" value={form.projectStage} onChange={update} maxLength={120} placeholder="Planning, active build, replacement, etc." /></label>
            <label>Project title *<input name="title" value={form.title} onChange={update} required maxLength={180} /></label>
            <label>Project description *<textarea name="description" value={form.description} onChange={update} required minLength={30} maxLength={5000} rows={7} /></label>
            <label>Reference URL<input name="referenceUrl" value={form.referenceUrl} onChange={update} maxLength={500} placeholder="Optional link to docs or existing system" /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" /></label>
            <label className="checkbox-label"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required /><span>I confirm this request is legitimate and I consent to being contacted about this project.</span></label>
            {state.error && <div className="form-error">{state.error}</div>}
            <button className="btn btn-primary" disabled={state.loading}>{state.loading ? 'Sending…' : <>Submit request <Send size={16} /></>}</button>
          </form>
        </div>
      </section>
    </>
  );
}
