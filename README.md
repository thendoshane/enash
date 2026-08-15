# ENASH Company Website

Full React + Vite front-facing company website for **ENASH**, operating through **INDESIGN AND DEVELOPERS (PTY) LTD**.

## What is included

- React + Vite multi-page SPA
- Orange-red ENASH design system
- Home, About, Services, individual Service pages, Projects, individual Project pages, Industries, Procurement, Compliance, Request Service, Contact, Insights, FAQ, Privacy, Terms and 404
- Live portfolio links:
  - Kitchen Manager — `https://kitchenmanagerv1.web.app/`
  - TaxiFind / Niyaphi — `https://impeesa-f35d2.web.app/`
  - What's There? — `https://whatstherev1.web.app/`
- Firebase Analytics configuration
- Firebase Cloud Functions backend
- Firestore storage for website leads/messages
- Resend email notifications
- Microsoft Azure OpenAI / Foundry-backed ENASH AI assistant
- Downloadable CIPC, B-BBEE and CSD documents
- Server-side secret handling
- Basic public-form abuse protection and honeypot fields

## Important security note

**Do not put Resend or Azure AI API keys in `src/`, Vite environment variables, or any browser-delivered file.**

The keys supplied during development are intentionally **not embedded in this project**. Both Resend and Azure AI credentials are configured as Firebase Secret Manager secrets.

If an API key has been pasted into chat, email, a ticket, or another non-secret location, rotate it before production deployment.

## 1. Install

```bash
npm install
cd functions
npm install
cd ..
```

Install Firebase CLI if you do not already have it:

```bash
npm install -g firebase-tools
firebase login
```

The project is already pointed at Firebase project `enashmain` in `.firebaserc`.

## 2. Configure backend settings

Create `functions/.env` from `functions/.env.example`:

```env
ENASH_INBOX=your-business-inbox@example.com
ENASH_FROM_EMAIL=ENASH <website@your-verified-domain.co.za>
AZURE_OPENAI_ENDPOINT=https://YOUR-RESOURCE.openai.azure.com/openai/v1
AZURE_OPENAI_MODEL=YOUR_DEPLOYMENT_NAME
AZURE_FOUNDRY_PROJECT_ENDPOINT=https://YOUR-RESOURCE.services.ai.azure.com/api/projects/YOUR-PROJECT
```

`ENASH_FROM_EMAIL` must use a sender/domain that is authorised in Resend. During initial testing, Resend's test sender can be used subject to Resend account restrictions.

## 3. Set secrets

Run:

```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set AZURE_OPENAI_API_KEY
```

Firebase will prompt you for each secret value. The secret does not need to be committed to source control.

## 4. Run locally

Frontend:

```bash
npm run dev
```

For full local Firebase testing, use Firebase Emulators after installing both sets of dependencies:

```bash
firebase emulators:start
```

## 5. Build

```bash
npm run build
```

The static build is created in `dist/`.

## 6. Deploy

Deploy everything:

```bash
firebase deploy
```

Or separately:

```bash
firebase deploy --only functions
npm run build
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

## Data created in Firestore

The website backend creates these collections:

- `serviceRequests` — detailed service/project briefs
- `contactMessages` — general website enquiries
- `aiWebsiteRequests` — website AI questions and generated answers
- `_publicRateLimits` — hashed short-lived request counters for basic abuse control

The supplied Firestore rules deny direct browser reads and writes. Cloud Functions use the Firebase Admin SDK to create the records.

## Email workflow

`serviceRequest`:

1. validates and stores the lead in Firestore;
2. sends an internal notification through Resend;
3. attempts a confirmation email to the requester;
4. returns an ENASH reference number to the browser.

`contactMessage` stores the message and sends the business inbox notification through Resend.

## AI assistant

The floating ENASH Assistant calls the `aiAssistant` Cloud Function. The function calls the configured Azure OpenAI v1 `/responses` endpoint using a server-side API key.

Set `AZURE_OPENAI_MODEL` to the **deployment/model name available in your Azure resource**. No model name is hard-coded because it depends on your Foundry deployment.

The Foundry project endpoint is retained in configuration for future agent/project integration, but the current public assistant only needs the Azure OpenAI v1 endpoint and API key.

## Resend domain

Before production:

1. add/verify your ENASH sending domain in Resend;
2. set the DNS records Resend provides;
3. change `ENASH_FROM_EMAIL` to an address on that verified domain;
4. send a test service request and check both Firestore and the business inbox.

## Custom domain

After Firebase Hosting is deployed, add the ENASH domain in Firebase Console > Hosting > Add custom domain. Firebase will provide DNS verification and hosting records.

## Compliance documents

Files are served from:

- `/compliance/CIPC-COR14.3.pdf`
- `/compliance/BBBEE-Certificate.pdf`
- `/compliance/CSD-Registration-Report.pdf`

The B-BBEE card dynamically checks the supplied certificate expiry date instead of permanently displaying an outdated “valid” badge.
