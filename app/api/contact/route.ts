import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function clean(value: unknown, max = 5000) {
  return String(value ?? "").trim().slice(0, max);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function htmlEscape(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char] || char));
}

function label(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as Payload;

    // Simple bot trap. Humans never see or fill this field.
    if (clean(raw.website, 200)) return NextResponse.json({ message: "Thank you. ENASH has received your request." });

    const submission = {
      type: clean(raw.type, 40) || "general",
      projectProcess: clean(raw.projectProcess, 40),
      name: clean(raw.name, 120),
      email: clean(raw.email, 180),
      company: clean(raw.company, 180),
      phone: clean(raw.phone, 80),
      service: clean(raw.service, 180),
      budget: clean(raw.budget, 80),
      subject: clean(raw.subject, 180),
      documentRequest: clean(raw.documentRequest, 180),
      procurementType: clean(raw.procurementType, 120),
      reference: clean(raw.reference, 160),
      deadline: clean(raw.deadline, 80),
      message: clean(raw.message, 7000),
      assistantTranscript: clean(raw.assistantTranscript, 12000),
      receivedAt: new Date().toISOString(),
    };

    if (!submission.name || !submission.email || !isEmail(submission.email)) {
      return NextResponse.json({ error: "Please provide a valid name and email address." }, { status: 400 });
    }
    if (!submission.message && !submission.assistantTranscript) {
      return NextResponse.json({ error: "Please add a message or complete the AI-assisted project discovery." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ENASH_CONTACT_TO;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      console.error("ENASH form email is not configured. Required: RESEND_API_KEY, ENASH_CONTACT_TO, RESEND_FROM_EMAIL.");
      return NextResponse.json({ error: "The contact service is temporarily unavailable. Please email contactus@enash.co.za." }, { status: 503 });
    }

    const typeNames: Record<string, string> = {
      project: "Project Request",
      general: "General Enquiry",
      proposal: "Proposal Request",
      "company-documents": "Company Documents Request",
      procurement: "Procurement Request",
    };
    const subject = `ENASH ${typeNames[submission.type] || "Website Enquiry"} — ${submission.name}${submission.company ? ` / ${submission.company}` : ""}`;
    const rows = Object.entries(submission).filter(([, value]) => value).map(([key, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #ddd;font-weight:700;vertical-align:top">${htmlEscape(label(key))}</td><td style="padding:8px 12px;border-bottom:1px solid #ddd;white-space:pre-wrap">${htmlEscape(String(value))}</td></tr>`).join("");
    const text = Object.entries(submission).filter(([, value]) => value).map(([key, value]) => `${label(key)}: ${value}`).join("\n\n");

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject,
        text,
        html: `<div style="font-family:Arial,sans-serif;color:#111"><h1 style="font-size:24px">${htmlEscape(subject)}</h1><table style="border-collapse:collapse;width:100%;max-width:900px">${rows}</table></div>`,
      }),
    });

    if (!emailRes.ok) {
      const providerError = await emailRes.text();
      console.error("Resend delivery failed:", providerError.slice(0, 1000));
      return NextResponse.json({ error: "Your request could not be delivered. Please email contactus@enash.co.za." }, { status: 502 });
    }

    return NextResponse.json({ message: "Thank you. ENASH has received your request and will follow up using the details provided." });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
