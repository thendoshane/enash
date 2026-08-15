const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { Resend } = require('resend');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

initializeApp();
const db = getFirestore();

const RESEND_API_KEY = defineSecret('RESEND_API_KEY');
const AZURE_OPENAI_API_KEY = defineSecret('AZURE_OPENAI_API_KEY');

const ENASH_INBOX = defineString('ENASH_INBOX', { default: 'siphumathendoshane@gmail.com' });
const ENASH_FROM_EMAIL = defineString('ENASH_FROM_EMAIL', { default: 'ENASH Website <onboarding@resend.dev>' });
const AZURE_OPENAI_ENDPOINT = defineString('AZURE_OPENAI_ENDPOINT', { default: '' });
const AZURE_OPENAI_MODEL = defineString('AZURE_OPENAI_MODEL', { default: '' });

const REGION = 'us-central1';
const callableOptions = {
  region: REGION,
  timeoutSeconds: 60,
  memory: '256MiB',
  cors: true,
};

const PUBLIC_MAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com',
  'yahoo.com', 'icloud.com', 'me.com', 'aol.com', 'proton.me', 'protonmail.com',
]);

const PRIVATE_DOCUMENTS = {
  cipc: {
    title: 'CIPC Registration Certificate',
    filename: 'ENASH-CIPC-COR14.3.pdf',
    source: 'CIPC-COR14.3.pdf',
  },
  bbbee: {
    title: 'B-BBEE Certificate',
    filename: 'ENASH-BBBEE-Certificate.pdf',
    source: 'BBBEE-Certificate.pdf',
  },
  csd: {
    title: 'CSD Registration Report',
    filename: 'ENASH-CSD-Registration-Report.pdf',
    source: 'CSD-Registration-Report.pdf',
  },
};

function clean(value, max = 1000) {
  if (value === null || value === undefined) return '';
  return String(value).trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value, 10000)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function requireEmail(email) {
  const value = clean(email, 180).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new HttpsError('invalid-argument', 'Please enter a valid email address.');
  }
  return value;
}

function getClientIp(request) {
  const forwarded = request.rawRequest?.headers?.['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : (forwarded || request.rawRequest?.ip || 'unknown');
  return String(raw).split(',')[0].trim();
}

async function enforceRateLimit(request, bucket, limit = 12) {
  const ip = getClientIp(request);
  const day = new Date().toISOString().slice(0, 10);
  const fingerprint = crypto.createHash('sha256').update(`${bucket}|${day}|${ip}`).digest('hex').slice(0, 32);
  const ref = db.collection('_publicRateLimits').doc(`${bucket}_${fingerprint}`);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const count = snap.exists ? Number(snap.data().count || 0) : 0;
    if (count >= limit) throw new HttpsError('resource-exhausted', 'Too many requests. Please try again later.');
    tx.set(ref, { count: count + 1, day, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  });
}

function reference(prefix = 'EN') {
  const date = new Date().toISOString().slice(2, 10).replaceAll('-', '');
  return `${prefix}-${date}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
}

function extractAddress(value) {
  const text = clean(value, 260);
  const match = text.match(/<([^>]+)>/);
  return (match ? match[1] : text).toLowerCase();
}

function resolveFromEmail() {
  const configured = clean(ENASH_FROM_EMAIL.value(), 260);
  const address = extractAddress(configured);
  const domain = address.split('@')[1] || '';

  // Resend cannot send from Gmail/Outlook/Yahoo/etc. If a public mailbox was
  // entered during Firebase deployment, use Resend's testing sender instead.
  // Once enash.co.za (or another owned domain) is verified in Resend, set
  // ENASH_FROM_EMAIL to e.g. "ENASH <hello@enash.co.za>" and it will be used.
  if (!configured || PUBLIC_MAIL_DOMAINS.has(domain)) {
    console.warn(`ENASH_FROM_EMAIL "${configured || '(empty)'}" is not a verified custom-domain sender. Falling back to onboarding@resend.dev.`);
    return 'ENASH Website <onboarding@resend.dev>';
  }

  return configured;
}

async function sendEmail(payload) {
  const resend = new Resend(RESEND_API_KEY.value());
  const result = await resend.emails.send({ ...payload, from: resolveFromEmail() });
  if (result.error) {
    const error = new Error(result.error.message || 'Resend email failed');
    error.resend = result.error;
    throw error;
  }
  return result.data;
}

function emailShell(title, body) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;background:#f4f7f6;padding:28px;color:#17313b"><div style="max-width:720px;margin:auto;background:white;border:1px solid #dfe8e5;border-radius:14px;overflow:hidden"><div style="padding:22px 26px;background:#17313b;color:#fff"><div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#a9d7ce">ENASH</div><h1 style="font-size:22px;margin:7px 0 0">${escapeHtml(title)}</h1></div><div style="padding:26px;line-height:1.65">${body}</div><div style="padding:16px 26px;border-top:1px solid #edf1ef;color:#6f7e83;font-size:12px">ENASH · INDESIGN AND DEVELOPERS (PTY) LTD</div></div></div>`;
}

function emailDeliveryNotice(error) {
  const message = clean(error?.message, 500).toLowerCase();
  if (message.includes('verify a domain') || message.includes('testing emails')) {
    return 'Confirmation email could not be sent because the Resend sending domain is not verified yet.';
  }
  return 'Confirmation email could not be delivered. ENASH still received the request.';
}

function normaliseAzureBaseUrl(raw) {
  const endpoint = clean(raw, 600).replace(/\/+$/, '');
  if (!endpoint) return '';

  // Foundry project endpoint:
  // https://<resource>.services.ai.azure.com/api/projects/<project>
  // -> <project_endpoint>/openai/v1/responses
  if (endpoint.includes('.services.ai.azure.com/api/projects/')) {
    if (endpoint.endsWith('/openai/v1')) return endpoint;
    return `${endpoint}/openai/v1`;
  }

  // Azure OpenAI / Foundry resource endpoints.
  if (endpoint.endsWith('/openai/v1')) return endpoint;
  if (endpoint.includes('.openai.azure.com') || endpoint.includes('.services.ai.azure.com')) {
    return `${endpoint}/openai/v1`;
  }

  return endpoint;
}

function extractOutputText(data) {
  if (typeof data?.output_text === 'string') return data.output_text;
  const pieces = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if ((content?.type === 'output_text' || content?.type === 'text') && content?.text) pieces.push(content.text);
    }
  }
  return pieces.join('\n').trim();
}

function navigationHint(message, answer = '') {
  const text = `${message} ${answer}`.toLowerCase();
  if (/quote|quotation|project|build|requirements|brief|request a service/.test(text)) return { label: 'Start a project request', path: '/request-service' };
  if (/service|software|website|cloud|data|automation|database|training|procurement/.test(text)) return { label: 'View ENASH services', path: '/services' };
  if (/project|developed|kitchen|taxi|what.?s there|system/.test(text)) return { label: 'Systems developed by ENASH', path: '/projects' };
  if (/certificate|document|cipc|b-?bbee|csd|compliance|credential/.test(text)) return { label: 'Request company documents', path: '/compliance' };
  if (/contact|email|message|talk|reach/.test(text)) return { label: 'Contact ENASH', path: '/contact' };
  if (/about|company|who are you|enash/.test(text)) return { label: 'About ENASH', path: '/about' };
  return null;
}

async function callAzureAssistant({ message, page, mode, history, projectContext }) {
  const baseUrl = normaliseAzureBaseUrl(AZURE_OPENAI_ENDPOINT.value());
  const model = clean(AZURE_OPENAI_MODEL.value(), 160);
  if (!baseUrl || !model) {
    throw new HttpsError('failed-precondition', 'The ENASH AI assistant is missing its Azure endpoint or model deployment name.');
  }

  const safeHistory = Array.isArray(history)
    ? history.slice(-10).map((item) => `${clean(item?.role, 20)}: ${clean(item?.text, 1200)}`).join('\n')
    : '';
  const context = clean(projectContext, 3500);

  const baseRules = `You are ENASH Assistant for INDESIGN AND DEVELOPERS (PTY) LTD. You are embedded in the ENASH company website. Be concise, practical and friendly. Never ask for passwords, API keys, identity numbers, banking details or other secrets. Never invent prices, delivery dates, certifications or guarantees.\n\nWebsite map:\n- /about — company overview\n- /services — software, web, data & AI, cloud, automation, database, design, training, consulting, procurement and support services\n- /projects — systems developed by ENASH Developers: Kitchen Manager, TaxiFind / Niyaphi, and What's There?\n- /compliance — request CIPC, B-BBEE and CSD documents by email; documents are not publicly downloadable\n- /request-service — start a project request manually or with AI guidance\n- /contact — general contact form`;

  let taskRules = `Help the visitor navigate the ENASH website, understand services, decide where to go next, or shape a basic project idea. When recommending a page, mention its exact path. Current page: ${page || '/'}.`;

  if (mode === 'project-intake') {
    taskRules = `You are guiding a visitor through defining a project requirement. Ask one useful question at a time. Cover: the problem today, users, desired outcome, must-have functions, existing systems/integrations, timing and constraints. Do not force a technology choice. When enough information exists, provide a short structured requirement summary headed "Draft requirement" that they can use in the ENASH request form. Current project form context: ${context || 'No form fields completed yet.'}`;
  }

  if (mode === 'project-summary') {
    taskRules = `Turn the conversation and current project context into a concise project brief suitable for a service request. Use plain text with short headings: Problem, Users, Required outcome, Key functions, Integrations/constraints, Timing. Do not add facts that were not provided. Current project form context: ${context || 'No form fields completed yet.'}`;
  }

  const input = `${baseRules}\n\n${taskRules}\n\nConversation so far:\n${safeHistory || '(none)'}\n\nLatest visitor message:\n${message}`;

  const response = await fetch(`${baseUrl}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': AZURE_OPENAI_API_KEY.value(),
    },
    body: JSON.stringify({
      model,
      input,
      max_output_tokens: mode === 'project-summary' ? 700 : 500,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Azure/Foundry assistant error:', response.status, baseUrl, model, text.slice(0, 1600));

    if (response.status === 404) {
      throw new HttpsError('failed-precondition', 'The AI endpoint is reachable, but the configured Azure model deployment was not found. AZURE_OPENAI_MODEL must match the deployment name in Microsoft Foundry.');
    }
    if (response.status === 401 || response.status === 403) {
      throw new HttpsError('failed-precondition', 'Azure rejected the AI credentials. Check the AZURE_OPENAI_API_KEY secret for this Foundry resource.');
    }
    if (response.status === 400 && /model.*not supported|unsupported/i.test(text)) {
      throw new HttpsError('failed-precondition', 'The configured model deployment does not support the Responses API. Choose a deployment that supports Responses.');
    }
    throw new HttpsError('internal', 'The ENASH assistant could not respond right now.');
  }

  const data = await response.json();
  const answer = clean(extractOutputText(data), 5000);
  if (!answer) throw new HttpsError('internal', 'The ENASH assistant returned an empty response.');

  return { answer, route: navigationHint(message, answer), model };
}

exports.serviceRequest = onCall(
  { ...callableOptions, secrets: [RESEND_API_KEY] },
  async (request) => {
    await enforceRateLimit(request, 'service', 10);
    const d = request.data || {};
    if (clean(d.website, 200)) return { ok: true, reference: reference('EN-H') };

    const name = clean(d.name, 120);
    const email = requireEmail(d.email);
    const service = clean(d.service, 120);
    const title = clean(d.title, 180);
    const description = clean(d.description, 5000);
    const consent = Boolean(d.consent);

    if (!name || !service || !title || description.length < 30 || !consent) {
      throw new HttpsError('invalid-argument', 'Please complete the required service request fields.');
    }

    const refCode = reference('EN-SR');
    const doc = {
      reference: refCode,
      status: 'new',
      source: 'enash-website',
      requestMode: clean(d.requestMode, 30) || 'manual',
      name,
      organisation: clean(d.organisation, 160),
      email,
      phone: clean(d.phone, 40),
      service,
      budget: clean(d.budget, 80),
      timeline: clean(d.timeline, 80),
      projectStage: clean(d.projectStage, 120),
      title,
      description,
      assistantNotes: clean(d.assistantNotes, 5000),
      referenceUrl: clean(d.referenceUrl, 500),
      consent,
      createdAt: FieldValue.serverTimestamp(),
      emailNotification: 'pending',
    };

    const leadRef = db.collection('serviceRequests').doc(refCode);
    await leadRef.set(doc);

    const rows = [
      ['Reference', refCode], ['Request mode', doc.requestMode], ['Name', name], ['Organisation', doc.organisation || '—'], ['Email', email],
      ['Phone', doc.phone || '—'], ['Service', service], ['Project stage', doc.projectStage || '—'],
      ['Budget', doc.budget || '—'], ['Timeline', doc.timeline || '—'], ['Title', title],
      ['Reference URL', doc.referenceUrl || '—'],
    ];
    const rowHtml = rows.map(([label, value]) => `<tr><td style="padding:8px 12px;color:#6f7e83;border-bottom:1px solid #edf1ef">${escapeHtml(label)}</td><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #edf1ef">${escapeHtml(value)}</td></tr>`).join('');

    let adminEmailSent = false;
    let confirmationEmailSent = false;
    let emailNotice = '';

    try {
      await sendEmail({
        to: [ENASH_INBOX.value()],
        replyTo: email,
        subject: `[${refCode}] New ENASH project request — ${title}`,
        html: emailShell('New project request', `<table style="width:100%;border-collapse:collapse">${rowHtml}</table><h3 style="margin-top:24px">Project brief</h3><p style="white-space:pre-wrap">${escapeHtml(description)}</p>${doc.assistantNotes ? `<h3>AI-guided notes</h3><p style="white-space:pre-wrap">${escapeHtml(doc.assistantNotes)}</p>` : ''}`),
      });
      adminEmailSent = true;
      await leadRef.update({ emailNotification: 'sent', emailSentAt: FieldValue.serverTimestamp() });
    } catch (emailError) {
      console.error('Service request admin email failed:', emailError);
      emailNotice = emailDeliveryNotice(emailError);
      await leadRef.update({ emailNotification: 'failed', emailError: clean(emailError.message, 500) });
    }

    if (adminEmailSent) {
      try {
        await sendEmail({
          to: [email],
          subject: `ENASH received your project request — ${refCode}`,
          html: emailShell('We received your project request', `<p>Hi ${escapeHtml(name)},</p><p>Your request has been recorded with reference <strong>${refCode}</strong>.</p><p><strong>${escapeHtml(title)}</strong></p><p>ENASH will review the requirement and respond using the contact details you provided.</p>`),
        });
        confirmationEmailSent = true;
      } catch (ackError) {
        console.warn('Service request confirmation email not sent:', ackError.message);
        emailNotice = emailDeliveryNotice(ackError);
      }
    }

    await leadRef.update({ confirmationEmailSent, emailNotice: emailNotice || null });
    return { ok: true, reference: refCode, adminEmailSent, confirmationEmailSent, emailNotice };
  },
);

exports.contactMessage = onCall(
  { ...callableOptions, secrets: [RESEND_API_KEY] },
  async (request) => {
    await enforceRateLimit(request, 'contact', 12);
    const d = request.data || {};
    if (clean(d.website, 200)) return { ok: true };

    const name = clean(d.name, 120);
    const email = requireEmail(d.email);
    const subject = clean(d.subject, 180);
    const message = clean(d.message, 4000);
    if (!name || !subject || message.length < 10) throw new HttpsError('invalid-argument', 'Please complete the contact form.');

    const refCode = reference('EN-C');
    const messageRef = db.collection('contactMessages').doc(refCode);
    await messageRef.set({ reference: refCode, name, email, subject, message, status: 'new', source: 'enash-website', createdAt: FieldValue.serverTimestamp(), emailNotification: 'pending' });

    let adminEmailSent = false;
    let confirmationEmailSent = false;
    let emailNotice = '';

    try {
      await sendEmail({
        to: [ENASH_INBOX.value()],
        replyTo: email,
        subject: `[${refCode}] ENASH website message — ${subject}`,
        html: emailShell('New website message', `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr style="border:none;border-top:1px solid #edf1ef"><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`),
      });
      adminEmailSent = true;
      await messageRef.update({ emailNotification: 'sent', emailSentAt: FieldValue.serverTimestamp() });
    } catch (emailError) {
      console.error('Contact admin email failed:', emailError);
      emailNotice = emailDeliveryNotice(emailError);
      await messageRef.update({ emailNotification: 'failed', emailError: clean(emailError.message, 500) });
    }

    if (adminEmailSent) {
      try {
        await sendEmail({
          to: [email],
          subject: `ENASH received your message — ${refCode}`,
          html: emailShell('Message received', `<p>Hi ${escapeHtml(name)},</p><p>Thank you for contacting ENASH. Your message has been recorded with reference <strong>${refCode}</strong>.</p><p>We will respond using this email address.</p>`),
        });
        confirmationEmailSent = true;
      } catch (ackError) {
        console.warn('Contact confirmation email not sent:', ackError.message);
        emailNotice = emailDeliveryNotice(ackError);
      }
    }

    await messageRef.update({ confirmationEmailSent, emailNotice: emailNotice || null });
    return { ok: true, reference: refCode, adminEmailSent, confirmationEmailSent, emailNotice };
  },
);

exports.documentRequest = onCall(
  { ...callableOptions, secrets: [RESEND_API_KEY], timeoutSeconds: 60 },
  async (request) => {
    await enforceRateLimit(request, 'documents', 8);
    const d = request.data || {};
    if (clean(d.website, 200)) return { ok: true };

    const name = clean(d.name, 120);
    const email = requireEmail(d.email);
    const organisation = clean(d.organisation, 160);
    const purpose = clean(d.purpose, 1200);
    const consent = Boolean(d.consent);
    const requestedKeys = Array.isArray(d.documents)
      ? [...new Set(d.documents.map((item) => clean(item, 30)).filter((key) => PRIVATE_DOCUMENTS[key]))]
      : [];

    if (!name || !purpose || !consent || requestedKeys.length === 0) {
      throw new HttpsError('invalid-argument', 'Select at least one document and complete the required request details.');
    }

    const refCode = reference('EN-DOC');
    const requestedTitles = requestedKeys.map((key) => PRIVATE_DOCUMENTS[key].title);
    const requestRef = db.collection('documentRequests').doc(refCode);
    await requestRef.set({
      reference: refCode,
      name,
      email,
      organisation,
      purpose,
      documents: requestedKeys,
      documentTitles: requestedTitles,
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
      deliveryStatus: 'pending',
    });

    let adminEmailSent = false;
    let documentsEmailSent = false;
    let emailNotice = '';

    try {
      await sendEmail({
        to: [ENASH_INBOX.value()],
        replyTo: email,
        subject: `[${refCode}] ENASH document request`,
        html: emailShell('Company document request', `<p><strong>${escapeHtml(name)}</strong>${organisation ? ` from ${escapeHtml(organisation)}` : ''} requested:</p><ul>${requestedTitles.map((title) => `<li>${escapeHtml(title)}</li>`).join('')}</ul><p><strong>Purpose:</strong></p><p style="white-space:pre-wrap">${escapeHtml(purpose)}</p><p>Requester email: ${escapeHtml(email)}</p>`),
      });
      adminEmailSent = true;
    } catch (error) {
      console.error('Document request admin email failed:', error);
      emailNotice = emailDeliveryNotice(error);
    }

    try {
      const attachments = requestedKeys.map((key) => {
        const doc = PRIVATE_DOCUMENTS[key];
        const filePath = path.join(__dirname, 'private-documents', doc.source);
        return { filename: doc.filename, content: fs.readFileSync(filePath).toString('base64') };
      });

      await sendEmail({
        to: [email],
        subject: `Requested ENASH company documents — ${refCode}`,
        html: emailShell('Requested company documents', `<p>Hi ${escapeHtml(name)},</p><p>The ENASH company documents you requested are attached to this email.</p><p>Reference: <strong>${refCode}</strong></p><p>These documents are provided for the purpose stated in your request. Please use the latest issued versions for procurement or verification.</p>`),
        attachments,
      });
      documentsEmailSent = true;
      await requestRef.update({ deliveryStatus: 'sent', deliveredAt: FieldValue.serverTimestamp() });
    } catch (error) {
      console.error('Requested documents email failed:', error);
      emailNotice = emailDeliveryNotice(error);
      await requestRef.update({ deliveryStatus: 'failed', deliveryError: clean(error.message, 500) });
    }

    return { ok: true, reference: refCode, adminEmailSent, documentsEmailSent, emailNotice };
  },
);

exports.aiAssistant = onCall(
  { ...callableOptions, secrets: [AZURE_OPENAI_API_KEY], timeoutSeconds: 45 },
  async (request) => {
    await enforceRateLimit(request, 'ai', 30);
    const message = clean(request.data?.message, 1200);
    const page = clean(request.data?.page, 160);
    const mode = clean(request.data?.mode, 40) || 'navigation';
    if (!message) throw new HttpsError('invalid-argument', 'Enter a message for the ENASH assistant.');

    const result = await callAzureAssistant({
      message,
      page,
      mode,
      history: request.data?.history,
      projectContext: request.data?.projectContext,
    });

    await db.collection('aiWebsiteRequests').add({
      message,
      page,
      mode,
      answer: result.answer,
      route: result.route || null,
      createdAt: FieldValue.serverTimestamp(),
    });

    return { ok: true, answer: result.answer, route: result.route };
  },
);
