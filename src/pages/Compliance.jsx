import { useState } from 'react';
import { CheckCircle2, FileBadge2, FileCheck2, Send, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import { company } from '../data/siteData';
import { requestCompanyDocuments } from '../lib/api';

const availableDocuments = [
  { key: 'cipc', title: 'CIPC Registration Certificate', icon: FileBadge2 },
  { key: 'bbbee', title: 'B-BBEE Certificate', icon: ShieldCheck },
  { key: 'csd', title: 'CSD Registration Report', icon: FileCheck2 },
];

export default function Compliance() {
  const [form, setForm] = useState({ name: '', organisation: '', email: '', purpose: '', documents: [], consent: false, website: '' });
  const [state, setState] = useState({ loading: false, error: '', sent: false, reference: '', delivered: false, notice: '' });

  function update(event) {
    const { name, value, type, checked } = event.target;
    if (name === 'documents') {
      setForm((previous) => ({ ...previous, documents: checked ? [...previous.documents, value] : previous.documents.filter((item) => item !== value) }));
      return;
    }
    setForm((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  }

  async function submit(event) {
    event.preventDefault();
    setState({ loading: true, error: '', sent: false, reference: '', delivered: false, notice: '' });
    try {
      const data = await requestCompanyDocuments(form);
      setState({ loading: false, error: '', sent: true, reference: data.reference || '', delivered: Boolean(data.documentsEmailSent), notice: data.emailNotice || '' });
      setForm({ name: '', organisation: '', email: '', purpose: '', documents: [], consent: false, website: '' });
    } catch (error) {
      setState({ loading: false, error: error?.message || 'Could not submit the document request.', sent: false, reference: '', delivered: false, notice: '' });
    }
  }

  return (
    <>
      <PageHero eyebrow="Company documents" title="Verification documents, shared when needed." text="ENASH keeps formal registration and supplier documents off the public website. Request the documents required for onboarding, procurement or verification." />
      <section className="section">
        <div className="container document-request-grid clean-document-grid">
          <div className="company-summary-card">
            <span className="eyebrow">Company</span>
            <h2>{company.legalName}</h2>
            <p>Trading as ENASH · Registration {company.registrationNumber}</p>
            <div className="document-request-list">
              {availableDocuments.map((doc) => { const Icon = doc.icon; return <article key={doc.key}><span className="icon-box"><Icon size={19} /></span><strong>{doc.title}</strong></article>; })}
            </div>
          </div>
          <form className="enash-form compact-form" onSubmit={submit}>
            <h2>Request documents</h2>
            {state.sent && <div className={state.delivered ? 'form-success-inline' : 'form-notice'}>{state.delivered && <CheckCircle2 size={17} />}{state.delivered ? `Documents sent. Reference ${state.reference}.` : `Request received. Reference ${state.reference}. ${state.notice || ''}`}</div>}
            <div className="form-grid two">
              <label>Full name *<input name="name" value={form.name} onChange={update} required maxLength={120} /></label>
              <label>Organisation<input name="organisation" value={form.organisation} onChange={update} maxLength={160} /></label>
            </div>
            <label>Email *<input name="email" type="email" value={form.email} onChange={update} required maxLength={180} /></label>
            <fieldset className="document-choice-set">
              <legend>Select document(s) *</legend>
              {availableDocuments.map((doc) => <label key={doc.key}><input type="checkbox" name="documents" value={doc.key} checked={form.documents.includes(doc.key)} onChange={update} /><span>{doc.title}</span></label>)}
            </fieldset>
            <label>Purpose *<textarea name="purpose" value={form.purpose} onChange={update} required minLength={10} maxLength={1200} rows={4} placeholder="Supplier onboarding, RFQ verification, due diligence…" /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" /></label>
            <label className="checkbox-label"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required /><span>I confirm this request is for a legitimate business, procurement or verification purpose.</span></label>
            {state.error && <div className="form-error">{state.error}</div>}
            <button className="btn btn-primary" disabled={state.loading || form.documents.length === 0}>{state.loading ? 'Sending…' : <>Request documents <Send size={16} /></>}</button>
          </form>
        </div>
      </section>
    </>
  );
}
