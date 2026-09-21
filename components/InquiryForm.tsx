"use client";

import { FormEvent, useState } from "react";

type InquiryType = "general" | "proposal" | "company-documents" | "procurement";
type Status = "idle" | "sending" | "success" | "error";

const labels: Record<InquiryType, string> = {
  general: "General enquiry",
  proposal: "Request a proposal",
  "company-documents": "Company documents",
  procurement: "Procurement support",
};

export default function InquiryForm({ initialType = "general", procurementOnly = false }: { initialType?: string; procurementOnly?: boolean }) {
  const valid = ["general", "proposal", "company-documents", "procurement"].includes(initialType) ? initialType as InquiryType : "general";
  const [type, setType] = useState<InquiryType>(procurementOnly ? "procurement" : valid);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus("success");
      setFeedback(body.message || "Your request has been received.");
      form.reset();
    } else {
      setStatus("error");
      setFeedback(body.error || "Your request could not be sent. Please try again.");
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      {!procurementOnly && (
        <div className="field">
          <label htmlFor="inquiry-type">What can we help with?</label>
          <select id="inquiry-type" value={type} onChange={(e) => setType(e.target.value as InquiryType)}>
            {Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      )}

      <div className="form-grid">
        <div className="field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="form-grid">
        <div className="field"><label htmlFor="contact-company">Company / organisation</label><input id="contact-company" name="company" autoComplete="organization" /></div>
        <div className="field"><label htmlFor="contact-phone">Phone</label><input id="contact-phone" name="phone" autoComplete="tel" /></div>
      </div>

      {type === "company-documents" && (
        <div className="field">
          <label htmlFor="document-request">Documents required</label>
          <select id="document-request" name="documentRequest" defaultValue="B-BBEE certificate and CSD report">
            <option>B-BBEE certificate and CSD report</option>
            <option>B-BBEE certificate</option>
            <option>CSD report</option>
          </select>
        </div>
      )}

      {type === "proposal" && (
        <div className="field"><label htmlFor="proposal-service">Proposal for</label><input id="proposal-service" name="subject" placeholder="Example: company website, custom software, AI automation" /></div>
      )}

      {type === "procurement" && (
        <>
          <div className="form-grid">
            <div className="field"><label htmlFor="procurement-type">Procurement request</label><select id="procurement-type" name="procurementType" defaultValue="RFQ"><option>RFQ</option><option>RFP</option><option>RFI</option><option>Tender / bid support</option><option>Supplier sourcing</option><option>Other</option></select></div>
            <div className="field"><label htmlFor="reference">Reference number</label><input id="reference" name="reference" /></div>
          </div>
          <div className="field"><label htmlFor="deadline">Submission / response deadline</label><input id="deadline" name="deadline" type="date" /></div>
        </>
      )}

      <div className="field">
        <label htmlFor="contact-message">{type === "company-documents" ? "Organisation / request notes" : "Message"}</label>
        <textarea id="contact-message" name="message" required placeholder={type === "procurement" ? "Tell us what needs to be sourced, quoted, prepared or submitted." : "How can ENASH help?"} />
      </div>

      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-dark submit-wide" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : labels[type]}</button>
      {feedback && <div className={`form-status ${status}`}>{feedback}</div>}
    </form>
  );
}
