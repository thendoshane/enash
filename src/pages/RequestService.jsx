import { useMemo, useState } from 'react';
import { Bot, CheckCircle2, FileText, Send, WandSparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { services } from '../data/siteData';
import { askEnashAssistant, submitServiceRequest } from '../lib/api';

const initialForm = {
  name: '', organisation: '', email: '', phone: '', service: '', budget: '', timeline: '',
  projectStage: '', title: '', description: '', referenceUrl: '', consent: false, website: '',
};

const introMessage = {
  role: 'assistant',
  text: 'Tell me what you are trying to improve or build. I will ask a few focused questions and help turn your answers into a project brief.',
};

export default function RequestService() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('service') || '';
  const validPreselected = useMemo(() => services.some((s) => s.slug === preselected) ? preselected : '', [preselected]);
  const [form, setForm] = useState({ ...initialForm, service: validPreselected });
  const [requestMode, setRequestMode] = useState('manual');
  const [state, setState] = useState({ loading: false, error: '', success: '', reference: '', emailNotice: '', confirmationEmailSent: false });
  const [assistantMessages, setAssistantMessages] = useState([introMessage]);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantLoading, setAssistantLoading] = useState(false);

  function update(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function projectContext() {
    return [
      form.service && `Selected service: ${form.service}`,
      form.projectStage && `Project stage: ${form.projectStage}`,
      form.timeline && `Timeline: ${form.timeline}`,
      form.budget && `Budget range: ${form.budget}`,
      form.title && `Working title: ${form.title}`,
      form.description && `Current brief: ${form.description}`,
    ].filter(Boolean).join('\n');
  }

  async function sendAssistantMessage(e) {
    e?.preventDefault();
    const text = assistantInput.trim();
    if (!text || assistantLoading) return;
    const history = [...assistantMessages, { role: 'user', text }];
    setAssistantMessages(history);
    setAssistantInput('');
    setAssistantLoading(true);
    try {
      const data = await askEnashAssistant({
        message: text,
        page: '/request-service',
        mode: 'project-intake',
        history: history.slice(-10),
        projectContext: projectContext(),
      });
      setAssistantMessages((current) => [...current, { role: 'assistant', text: data.answer }]);
    } catch (error) {
      setAssistantMessages((current) => [...current, { role: 'assistant', text: error?.message || 'The project assistant is temporarily unavailable.' }]);
    } finally {
      setAssistantLoading(false);
    }
  }

  async function buildBrief() {
    if (assistantMessages.length < 3 || assistantLoading) return;
    setAssistantLoading(true);
    try {
      const data = await askEnashAssistant({
        message: 'Create the draft requirement now using only what I have told you.',
        page: '/request-service',
        mode: 'project-summary',
        history: assistantMessages.slice(-12),
        projectContext: projectContext(),
      });
      setForm((prev) => ({
        ...prev,
        description: data.answer,
        title: prev.title || 'Project requirement',
      }));
      setAssistantMessages((current) => [...current, { role: 'assistant', text: 'I added a draft requirement to the form. Review it, edit anything you want, then submit it to ENASH.' }]);
    } catch (error) {
      setAssistantMessages((current) => [...current, { role: 'assistant', text: error?.message || 'I could not create the draft right now.' }]);
    } finally {
      setAssistantLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, error: '', success: '', reference: '', emailNotice: '', confirmationEmailSent: false });
    try {
      const assistantNotes = requestMode === 'guided'
        ? assistantMessages.map((item) => `${item.role === 'user' ? 'Visitor' : 'ENASH Assistant'}: ${item.text}`).join('\n\n')
        : '';
      const data = await submitServiceRequest({ ...form, requestMode, assistantNotes });
      setState({
        loading: false,
        error: '',
        success: 'Your project request has been received.',
        reference: data.reference || '',
        emailNotice: data.emailNotice || '',
        confirmationEmailSent: Boolean(data.confirmationEmailSent),
      });
      setForm({ ...initialForm, service: validPreselected });
      setAssistantMessages([introMessage]);
    } catch (error) {
      setState({ loading: false, error: error?.message || 'Could not submit the request. Please try again.', success: '', reference: '', emailNotice: '', confirmationEmailSent: false });
    }
  }

  if (state.success) {
    return (
      <section className="form-success-page">
        <div className="form-success-card">
          <CheckCircle2 size={48} />
          <span className="eyebrow">Request received</span>
          <h1>Thank you. ENASH has your project request.</h1>
          <p>Your details are recorded for follow-up.</p>
          {state.reference && <div className="reference-code">Reference: <strong>{state.reference}</strong></div>}
          {state.confirmationEmailSent
            ? <div className="form-success-inline"><CheckCircle2 size={17} /> A confirmation email was sent to you.</div>
            : state.emailNotice && <div className="form-notice">{state.emailNotice}</div>}
          <button className="btn btn-primary" onClick={() => setState({ loading: false, error: '', success: '', reference: '', emailNotice: '', confirmationEmailSent: false })}>Submit another request</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Start a project" title="Tell ENASH what you need." text="Complete the request yourself, or use ENASH Assistant to help shape the requirement before you submit it." />

      <section className="section request-section">
        <div className="container">
          <div className="request-mode-switch" role="group" aria-label="Choose project request method">
            <button className={requestMode === 'manual' ? 'active' : ''} onClick={() => setRequestMode('manual')} type="button">
              <FileText size={20} /><span><strong>Complete it myself</strong><small>Use the normal project form.</small></span>
            </button>
            <button className={requestMode === 'guided' ? 'active' : ''} onClick={() => setRequestMode('guided')} type="button">
              <WandSparkles size={20} /><span><strong>Guide me with ENASH Assistant</strong><small>Get help defining the requirement.</small></span>
            </button>
          </div>

          <div className={`request-grid ${requestMode === 'guided' ? 'with-assistant' : ''}`}>
            {requestMode === 'manual' ? (
              <aside className="form-aside">
                <span className="eyebrow">A useful brief</span>
                <h2>Focus on the problem, users and outcome.</h2>
                <ol>
                  <li><span>1</span><div><strong>What happens now?</strong><p>Describe the current process or problem.</p></div></li>
                  <li><span>2</span><div><strong>Who will use it?</strong><p>Customers, staff, managers or another group.</p></div></li>
                  <li><span>3</span><div><strong>What should change?</strong><p>Describe what the finished solution should make possible.</p></div></li>
                  <li><span>4</span><div><strong>What matters most?</strong><p>Include important functions, integrations, timing or constraints.</p></div></li>
                </ol>
              </aside>
            ) : (
              <aside className="project-guide-panel">
                <div className="project-guide-head"><Bot size={20} /><div><strong>ENASH Project Assistant</strong><small>Requirements guidance</small></div></div>
                <div className="project-guide-messages">
                  {assistantMessages.map((item, index) => <div key={index} className={`guide-message ${item.role}`}>{item.text}</div>)}
                  {assistantLoading && <div className="guide-message assistant">Working…</div>}
                </div>
                <form className="project-guide-form" onSubmit={sendAssistantMessage}>
                  <textarea value={assistantInput} onChange={(e) => setAssistantInput(e.target.value)} rows={3} placeholder="Answer the assistant…" maxLength={1200} />
                  <button className="btn btn-secondary" disabled={assistantLoading || !assistantInput.trim()}>Send <Send size={15} /></button>
                </form>
                <button className="btn btn-outline full-width" type="button" onClick={buildBrief} disabled={assistantLoading || assistantMessages.length < 3}>Use conversation to draft my brief</button>
              </aside>
            )}

            <form className="enash-form" onSubmit={submit}>
              <div className="form-section-title"><span>01</span><div><strong>Contact details</strong><small>Who should we respond to?</small></div></div>
              <div className="form-grid two">
                <label>Full name *<input name="name" value={form.name} onChange={update} required maxLength={120} /></label>
                <label>Organisation<input name="organisation" value={form.organisation} onChange={update} maxLength={160} /></label>
                <label>Email *<input name="email" type="email" value={form.email} onChange={update} required maxLength={180} /></label>
                <label>Phone<input name="phone" value={form.phone} onChange={update} maxLength={40} /></label>
              </div>

              <div className="form-section-title"><span>02</span><div><strong>Project fit</strong><small>Help us route the request.</small></div></div>
              <div className="form-grid two">
                <label>Service *
                  <select name="service" value={form.service} onChange={update} required>
                    <option value="">Select a service</option>
                    {services.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
                  </select>
                </label>
                <label>Project stage
                  <select name="projectStage" value={form.projectStage} onChange={update}>
                    <option value="">Select stage</option>
                    <option>Idea / early exploration</option>
                    <option>Requirements already defined</option>
                    <option>Existing system needs improvement</option>
                    <option>Existing system needs support</option>
                    <option>Procurement / RFQ requirement</option>
                  </select>
                </label>
                <label>Budget range
                  <select name="budget" value={form.budget} onChange={update}>
                    <option value="">Prefer not to say yet</option>
                    <option>Under R10,000</option><option>R10,000 – R30,000</option><option>R30,000 – R75,000</option>
                    <option>R75,000 – R150,000</option><option>R150,000+</option><option>RFQ / tender budget</option>
                  </select>
                </label>
                <label>Target timeline
                  <select name="timeline" value={form.timeline} onChange={update}>
                    <option value="">Select timeline</option><option>Urgent / under 2 weeks</option><option>2–4 weeks</option>
                    <option>1–3 months</option><option>3+ months</option><option>Still planning</option>
                  </select>
                </label>
              </div>

              <div className="form-section-title"><span>03</span><div><strong>Requirement</strong><small>Review this before sending.</small></div></div>
              <label>Project / request title *<input name="title" value={form.title} onChange={update} required maxLength={180} placeholder="e.g. Customer booking and approval portal" /></label>
              <label>Project brief *<textarea name="description" value={form.description} onChange={update} required minLength={30} maxLength={5000} rows={9} placeholder="Describe what you need, who will use it, what happens now and what the finished solution should achieve." /></label>
              <label>Reference link<input name="referenceUrl" value={form.referenceUrl} onChange={update} maxLength={500} placeholder="https://... (optional)" /></label>
              <label className="honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" /></label>
              <label className="checkbox-label"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required /><span>I agree that ENASH may use these details to respond to this project request.</span></label>

              {state.error && <div className="form-error">{state.error}</div>}
              <button className="btn btn-primary btn-lg form-submit" disabled={state.loading}>{state.loading ? 'Sending request…' : <>Send project request <Send size={17} /></>}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
