import 'dotenv/config';
import crypto from 'crypto';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const app = express();
const PORT = Number(process.env.PORT || 8080);
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: false, limit: '64kb' }));
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

const rateBuckets = new Map();
function allowRequest(req, key, limit, windowMs) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const ip = forwarded || req.ip || req.socket.remoteAddress || 'unknown';
  const id = `${key}:${ip}`;
  const now = Date.now();
  const bucket = rateBuckets.get(id) || { count: 0, resetAt: now + windowMs };
  if (now > bucket.resetAt) { bucket.count = 0; bucket.resetAt = now + windowMs; }
  bucket.count += 1;
  rateBuckets.set(id, bucket);
  return bucket.count <= limit;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets.entries()) if (bucket.resetAt < now) rateBuckets.delete(key);
}, 10 * 60 * 1000).unref();

function clean(value, max = 1000) {
  return String(value ?? '').trim().replace(/\u0000/g, '').slice(0, max);
}
function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}
function validEmail(value) {
  const email = clean(value, 180).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}
function makeReference(prefix = 'EN') {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `${prefix}-${date}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}
function emailShell(title, content) {
  return `<!doctype html><html><body style="margin:0;background:#f6f3ea;font-family:Arial,sans-serif;color:#142235"><div style="max-width:680px;margin:0 auto;padding:28px"><div style="background:#fff;border:1px solid #e7e1d5;border-radius:20px;overflow:hidden"><div style="padding:24px 28px;background:#142235;color:#fff"><strong style="font-size:20px">ENASH</strong><div style="font-size:12px;opacity:.7;margin-top:4px">Building practical technology for everyday life.</div></div><div style="padding:28px"><h1 style="font-size:24px;margin:0 0 18px">${escapeHtml(title)}</h1>${content}</div></div><div style="font-size:11px;color:#687385;text-align:center;padding:14px">ENASH · Johannesburg, Gauteng, South Africa</div></div></body></html>`;
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    environment: process.env.NODE_ENV || 'development',
    emailConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL),
    aiConfigured: Boolean(process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_API_KEY && process.env.AZURE_OPENAI_MODEL),
  });
});

app.post('/api/contact', async (req, res) => {
  if (!allowRequest(req, 'contact', 12, 60 * 60 * 1000)) return res.status(429).json({ message: 'Too many messages from this connection. Please try again later.' });
  const body = req.body || {};
  if (clean(body.website, 200)) return res.json({ ok: true, reference: makeReference('EN-C') });

  const name = clean(body.name, 120);
  const email = validEmail(body.email);
  const topic = clean(body.topic, 100);
  const product = clean(body.product, 100);
  const subject = clean(body.subject, 180);
  const message = clean(body.message, 5000);
  if (!name || !email || !topic || !subject || message.length < 10) return res.status(400).json({ message: 'Please complete the required contact fields.' });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ENASH_CONTACT_TO || 'thendos@enash.co.za';
  if (!apiKey || !from) return res.status(503).json({ message: 'Email is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to the server environment.' });

  const reference = makeReference('EN-C');
  const resend = new Resend(apiKey);
  const rows = [
    ['Reference', reference], ['Name', name], ['Email', email], ['Topic', topic], ['Product', product || 'General'], ['Subject', subject],
  ].map(([label, value]) => `<tr><td style="padding:8px 10px;border-bottom:1px solid #eee;color:#697386">${escapeHtml(label)}</td><td style="padding:8px 10px;border-bottom:1px solid #eee;font-weight:700">${escapeHtml(value)}</td></tr>`).join('');

  try {
    const admin = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[${reference}] ${topic} — ${subject}`,
      html: emailShell('New ENASH website message', `<table style="width:100%;border-collapse:collapse">${rows}</table><h2 style="font-size:16px;margin-top:24px">Message</h2><p style="white-space:pre-wrap;line-height:1.65">${escapeHtml(message)}</p>`),
    }, { idempotencyKey: `enash-contact/${reference}` });
    if (admin.error) throw new Error(admin.error.message || 'Resend rejected the message.');
  } catch (error) {
    console.error('Resend admin delivery failed:', error);
    return res.status(502).json({ message: `The message could not be delivered. ${clean(error.message, 240)}` });
  }

  let confirmationEmailSent = false;
  let notice = '';
  try {
    const ack = await resend.emails.send({
      from,
      to: [email],
      subject: `ENASH received your message — ${reference}`,
      html: emailShell('Thanks for contacting ENASH', `<p>Hi ${escapeHtml(name)},</p><p>We received your message with reference <strong>${escapeHtml(reference)}</strong>.</p><p><strong>${escapeHtml(subject)}</strong></p><p>We’ll reply using the email address you provided.</p>`),
    }, { idempotencyKey: `enash-contact-ack/${reference}` });
    if (ack.error) throw new Error(ack.error.message || 'Confirmation could not be sent.');
    confirmationEmailSent = true;
  } catch (error) {
    console.warn('Resend confirmation delivery failed:', error.message);
    notice = 'Your message reached ENASH, but the confirmation email could not be sent.';
  }

  return res.json({ ok: true, reference, confirmationEmailSent, notice });
});

function normaliseAzureEndpoint(value) {
  let endpoint = clean(value, 500).replace(/\/+$/, '');
  if (!endpoint) return '';
  if (endpoint.endsWith('/openai/v1')) return `${endpoint}/`;
  if (endpoint.endsWith('/openai/v1/')) return endpoint;
  if (endpoint.includes('.openai.azure.com')) return `${endpoint}/openai/v1/`;
  return endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
}

function extractOutputText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
  const parts = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if ((content?.type === 'output_text' || content?.type === 'text') && content?.text) parts.push(content.text);
    }
  }
  return parts.join('\n').trim();
}

function routeHint(message, answer = '') {
  const text = `${message} ${answer}`.toLowerCase();
  if (/yenza/.test(text)) return { label: 'Open Yenza AI page', path: '/products/yenza-ai' };
  if (/taxi/.test(text)) return { label: 'Open TaxiFind page', path: '/products/taxifind' };
  if (/kitch|kitchen/.test(text)) return { label: 'Open KitchCore page', path: '/products/kitchcore' };
  if (/what.?s there|nearby|local discovery/.test(text)) return { label: "Open What's There? page", path: '/products/whats-there' };
  if (/product|build/.test(text)) return { label: 'See what ENASH is building', path: '/' };
  if (/company|registered|registration|legal/.test(text)) return { label: 'View company information', path: '/company' };
  if (/contact|email|partner|investment|media|feedback/.test(text)) return { label: 'Contact ENASH', path: '/contact' };
  return null;
}

const assistantRules = `You are the ENASH Assistant embedded on enash.co.za.

ABOUT ENASH
ENASH is the technology brand operated by INDESIGN AND DEVELOPERS (PTY) LTD, registration number 2020/588040/07, based in Johannesburg, Gauteng, South Africa. ENASH develops and operates its own digital products.

CURRENT PRODUCTS
- Yenza AI — AI productivity workspace for conversations, projects, files and practical AI workflows. Live domain: https://yenzaai.co.za/
- TaxiFind — South African mobility product for route discovery, taxi ranks, fares, community route knowledge and journey guidance. Live deployment: https://impeesa-f35d2.web.app/
- KitchCore — kitchen operations product evolving from the original Kitchen Manager application, focused on recurring workflows, task visibility and team handovers. Live deployment: https://kitchenmanagerv1.web.app/
- What's There? — local discovery product for finding useful options around a location. Live deployment: https://whatstherev1.web.app/

BEHAVIOUR
- Be concise, clear and useful.
- Describe only product/company facts supplied above or visible in the conversation. Do not invent users, revenue, funding, partnerships, customer names, certifications, traction, prices or launch dates.
- Do not keep repeating how many products ENASH has or use the word portfolio unless the visitor specifically asks about the company structure.
- Do not describe ENASH as an agency, consultancy or a company taking bespoke software jobs. If asked for custom client development, say the public ENASH focus is the technology it builds and operates, and invite the visitor to use the Contact page for partnership or general company enquiries.
- If a feature is uncertain, say it is under development or direct the visitor to the live product.
- The assistant is a website product guide, not legal, investment or Microsoft-program advice.
- Useful site routes: /, /products/yenza-ai, /products/taxifind, /products/kitchcore, /products/whats-there, /about, /company, /contact.`;

app.post('/api/assistant', async (req, res) => {
  if (!allowRequest(req, 'assistant', 40, 60 * 60 * 1000)) return res.status(429).json({ message: 'The assistant has received too many requests from this connection. Please try again later.' });
  if (String(process.env.AI_ASSISTANT_ENABLED || 'true').toLowerCase() === 'false') return res.status(503).json({ message: 'The ENASH Assistant is temporarily disabled.' });

  const endpoint = normaliseAzureEndpoint(process.env.AZURE_OPENAI_ENDPOINT);
  const apiKey = clean(process.env.AZURE_OPENAI_API_KEY, 500);
  const model = clean(process.env.AZURE_OPENAI_MODEL, 160);
  if (!endpoint || !apiKey || !model) return res.status(503).json({ message: 'The ENASH Assistant is not configured yet. Add the Azure Foundry endpoint, API key and deployment name to the server environment.' });

  const message = clean(req.body?.message, 1200);
  const page = clean(req.body?.page, 200);
  if (!message) return res.status(400).json({ message: 'Enter a message for the assistant.' });
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-8).map((item) => `${clean(item?.role, 20)}: ${clean(item?.text, 900)}`).join('\n') : '';
  const input = `${assistantRules}\n\nCurrent website page: ${page || '/'}\n\nRecent conversation:\n${history || '(none)'}\n\nVisitor message:\n${message}`;

  try {
    const response = await fetch(new URL('responses', endpoint), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({ model, input, max_output_tokens: 500 }),
    });
    const raw = await response.text();
    let data = {};
    try { data = JSON.parse(raw); } catch { data = {}; }
    if (!response.ok) {
      console.error('Azure Foundry response error:', response.status, raw.slice(0, 1500));
      if (response.status === 401 || response.status === 403) return res.status(502).json({ message: 'Microsoft Foundry rejected the configured API credentials.' });
      if (response.status === 404) return res.status(502).json({ message: 'The configured Foundry endpoint or model deployment was not found. Check AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_MODEL.' });
      return res.status(502).json({ message: 'The ENASH Assistant could not get a response from Microsoft Foundry.' });
    }
    const answer = clean(extractOutputText(data), 5000);
    if (!answer) return res.status(502).json({ message: 'Microsoft Foundry returned an empty response.' });
    return res.json({ ok: true, answer, route: routeHint(message, answer) });
  } catch (error) {
    console.error('Azure Foundry request failed:', error);
    return res.status(502).json({ message: 'The ENASH Assistant could not reach Microsoft Foundry.' });
  }
});

if (isProduction) {
  const distDir = path.join(rootDir, 'dist');
  app.use(express.static(distDir, { maxAge: '1d', etag: true }));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
    return res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => res.type('text').send('ENASH API server is running. Start Vite separately with npm run dev.'));
}

app.listen(PORT, '0.0.0.0', () => console.log(`ENASH server listening on port ${PORT}`));
