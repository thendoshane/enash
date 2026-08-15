import { useState } from 'react';
import { CheckCircle2, FileBadge2, FileCheck2, LockKeyhole, Send, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import { company } from '../data/siteData';
import { requestCompanyDocuments } from '../lib/api';

const availableDocuments = [
  { key: 'cipc', title: 'CIPC Registration Certificate', text: 'Company registration document for formal verification.', icon: FileBadge2 },
  { key: 'bbbee', title: 'B-BBEE Certificate', text: 'Current B-BBEE supporting document supplied by ENASH.', icon: ShieldCheck },
  { key: 'csd', title: 'CSD Registration Report', text: 'Central Supplier Database registration supporting document.', icon: FileCheck2 },
];

export default function Compliance() {
  const [form, setForm] = useState({ name: '', organisation: '', email: '', purpose: '', documents: [], consent: false, website: '' });
  const [state, setState] = useState({ loading: false, error: '', sent: false, reference: '', delivered: false, notice: '' });

  function update(e) {
    const { name, value, type, checked } = e.target;
    if (name === 'documents') {
      setForm((prev) => ({
        ...prev,
        documents: checked ? [...prev.documents, value] : prev.documents.filter((item) => item !== value),
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function submit(e) {
    e.preventDefault();
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
      <PageHero eyebrow="Company information" title="Company documents are available on request." text="ENASH does not publish registration and supplier documents as open website downloads. Clients and procurement teams can request the documents they need and receive them by email." />

      <section className="section">
        <div className="container compliance-summary-grid">
          <div className="company-summary-card">
            <LockKeyhole size={28} />
            <span className="eyebrow">ENASH company record</span>
            <h2>{company.legalName}</h2>
            <p>South African private company trading as ENASH. Formal company and supplier documents are shared through the request process below rather than exposed publicly.</p>
            <div className="company-summary-pills">
              <span>Registered company</span>
              <span>CSD supplier</span>
              <span>B-BBEE Level 1</span>
            </div>
          </div>

          <div className="document-request-list">
            <span className="eyebrow">Documents you can request</span>
            {availableDocuments.map((doc) => {
              const Icon = doc.icon;
              return (
                <article key={doc.key}>
                  <span className="icon-box"><Icon size={20} /></span>
                  <div><strong>{doc.title}</strong><p>{doc.text}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container document-request-grid">
          <div>
            <span className="eyebrow">Request documents</span>
            <h2>Tell us who needs them and why.</h2>
            <p>Selected documents are sent to the email address entered in the request. ENASH also keeps a record of the request for follow-up.</p>
          </div>

          <form className="enash-form compact-form" onSubmit={submit}>
            {state.sent && (
              <div className={state.delivered ? 'form-success-inline' : 'form-notice'}>
                {state.delivered && <CheckCircle2 size={17} />}
                {state.delivered ? `Documents sent by email. Reference ${state.reference}.` : `Request received. Reference ${state.reference}. ${state.notice || ''}`}
              </div>
            )}
            <div className="form-grid two">
              <label>Full name *<input name="name" value={form.name} onChange={update} required maxLength={120} /></label>
              <label>Organisation<input name="organisation" value={form.organisation} onChange={update} maxLength={160} /></label>
            </div>
            <label>Email *<input name="email" type="email" value={form.email} onChange={update} required maxLength={180} /></label>

            <fieldset className="document-choice-set">
              <legend>Select document(s) *</legend>
              {availableDocuments.map((doc) => (
                <label key={doc.key}>
                  <input type="checkbox" name="documents" value={doc.key} checked={form.documents.includes(doc.key)} onChange={update} />
                  <span>{doc.title}</span>
                </label>
              ))}
            </fieldset>

            <label>Purpose *<textarea name="purpose" value={form.purpose} onChange={update} required minLength={10} maxLength={1200} rows={5} placeholder="e.g. Supplier onboarding, RFQ verification, procurement due diligence…" /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" /></label>
            <label className="checkbox-label"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required /><span>I confirm that the documents are being requested for a legitimate business, procurement or verification purpose.</span></label>
            {state.error && <div className="form-error">{state.error}</div>}
            <button className="btn btn-primary" disabled={state.loading || form.documents.length === 0}>{state.loading ? 'Sending request…' : <>Request documents <Send size={16} /></>}</button>
          </form>
        </div>
      </section>
    </>
  );
}
