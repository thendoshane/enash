"use client";

import { FormEvent, useMemo, useState } from "react";
import { services } from "@/lib/services";

type Process = "manual" | "ai-assisted";
type Status = "idle" | "sending" | "success" | "error";
type ChatMessage = { role: "user" | "assistant"; content: string };

export default function ProjectRequestForm({ initialService = "" }: { initialService?: string }) {
  const validInitial = services.some((item) => item.slug === initialService) ? initialService : "";
  const [service, setService] = useState(validInitial);
  const [process, setProcess] = useState<Process>("manual");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const selected = useMemo(() => services.find((item) => item.slug === service), [service]);

  async function askAssistant() {
    const text = aiInput.trim();
    if (!text || aiBusy) return;
    const nextChat: ChatMessage[] = [...chat, { role: "user", content: text }];
    setChat(nextChat);
    setAiInput("");
    setAiBusy(true);
    try {
      const res = await fetch("/api/ai/project-discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, messages: nextChat }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "AI assistant is unavailable right now.");
      setChat((current) => [...current, { role: "assistant", content: body.reply }]);
    } catch (error) {
      setChat((current) => [...current, { role: "assistant", content: error instanceof Error ? error.message : "AI assistant is unavailable right now." }]);
    } finally {
      setAiBusy(false);
    }
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const assistantTranscript = chat.map((item) => `${item.role.toUpperCase()}: ${item.content}`).join("\n\n");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type: "project", service, projectProcess: process, assistantTranscript }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus("success");
      setFeedback(body.message || "Your project request has been received.");
      form.reset();
      setChat([]);
    } else {
      setStatus("error");
      setFeedback(body.error || "Your request could not be sent. Please try again.");
    }
  }

  return (
    <form className="form project-form" onSubmit={submit}>
      {selected && <div className="prefill-banner"><span>Selected service</span><strong>{selected.title}</strong></div>}

      <div className="form-grid">
        <div className="field"><label htmlFor="project-name">Name</label><input id="project-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="project-email">Email</label><input id="project-email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="form-grid">
        <div className="field"><label htmlFor="project-company">Company / startup</label><input id="project-company" name="company" autoComplete="organization" /></div>
        <div className="field"><label htmlFor="project-phone">Phone</label><input id="project-phone" name="phone" autoComplete="tel" /></div>
      </div>

      <div className="field">
        <label htmlFor="project-service">Service</label>
        <select id="project-service" name="serviceSelect" value={service} onChange={(e) => setService(e.target.value)} required>
          <option value="" disabled>Select a service</option>
          {services.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
          <option value="other">Other / not sure yet</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="project-budget">Estimated budget</label>
        <select id="project-budget" name="budget" defaultValue="Not sure yet">
          <option>Not sure yet</option>
          <option>Under R10,000</option>
          <option>R10,000 – R25,000</option>
          <option>R25,000 – R75,000</option>
          <option>R75,000 – R150,000</option>
          <option>R150,000+</option>
        </select>
      </div>

      <fieldset className="field fieldset-reset">
        <legend>How do you want to prepare the project request?</legend>
        <div className="process-grid">
          <button type="button" className={`process-card ${process === "manual" ? "active" : ""}`} onClick={() => setProcess("manual")}>
            <span className="process-index">01</span><strong>Manual request</strong><span>Write the project details yourself.</span>
          </button>
          <button type="button" className={`process-card ${process === "ai-assisted" ? "active" : ""}`} onClick={() => setProcess("ai-assisted")}>
            <span className="process-index">02</span><strong>AI-assisted discovery</strong><span>Use the ENASH assistant to structure the idea before submitting.</span>
          </button>
        </div>
      </fieldset>

      {process === "ai-assisted" && (
        <div className="ai-box">
          <div className="ai-box-head"><div><span className="mini-label">ENASH project assistant</span><strong>Build the brief with a few questions.</strong></div><span className="live-pill">AI</span></div>
          <p className="helper">Start with the rough idea, problem or outcome. The assistant will ask focused questions. Your conversation is attached to the project request.</p>
          {chat.length > 0 && <div className="ai-chat" aria-live="polite">{chat.map((message, index) => <div key={index} className={`chat-message ${message.role}`}><span>{message.role === "user" ? "You" : "ENASH AI"}</span><p>{message.content}</p></div>)}</div>}
          <div className="ai-input-row">
            <textarea value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Example: I want a booking platform for small salons..." aria-label="Message for the ENASH project assistant" />
            <button className="btn btn-outline" type="button" onClick={askAssistant} disabled={aiBusy || !aiInput.trim()}>{aiBusy ? "Thinking…" : chat.length ? "Continue" : "Start discovery"}</button>
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="project-details">{process === "manual" ? "Project details" : "Anything else we should know?"}</label>
        <textarea id="project-details" name="message" required={process === "manual"} placeholder={process === "manual" ? "What are you building, who is it for, what should it do, and when do you need it?" : "Optional notes to add to the AI-assisted discovery conversation."} />
      </div>

      <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-dark submit-wide" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit project request"}</button>
      {feedback && <div className={`form-status ${status}`}>{feedback}</div>}
    </form>
  );
}
