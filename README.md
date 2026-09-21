# ENASH website — Next.js

Production-oriented rebuild of **enash.co.za** using Next.js App Router.

## What is included

- Clean black/white interface with one blue accent.
- Custom ENASH mark + wordmark.
- Hero CTAs visible in the first desktop viewport.
- Compact About section with no unused left column.
- Six service cards with **Read more** and **Request** actions.
- Dedicated SEO page for every service, including deliverables, common technologies, delivery steps, indicative pricing, FAQs and request CTA.
- Project form with service preselection via `/request?service=...`.
- Manual or AI-assisted project discovery.
- Azure OpenAI / Microsoft Foundry integration using the existing environment variable names.
- General enquiry, proposal request and company-document request forms.
- Dedicated procurement page/form for RFQ, RFP, RFI, tender/bid support and sourcing enquiries.
- Resend email delivery using the existing environment variable names.
- SEO: page-specific metadata, canonical URLs, sitemap, robots rules, Organization/ProfessionalService/Service/FAQ/Breadcrumb structured data, Open Graph image and preserved `/about` + `/services` routes.
- Redirects from `/company` and `/contact-us`.

## Local setup

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. Fill the environment values.
4. Run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

The project intentionally uses the same names supplied for the existing Azure Web App:

```env
PORT=8080
NODE_ENV=development
PUBLIC_SITE_URL=https://www.enash.co.za
ENASH_CONTACT_TO=thendos@enash.co.za
RESEND_API_KEY=
RESEND_FROM_EMAIL="ENASH Website <website@enash.co.za>"
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_MODEL=
AI_ASSISTANT_ENABLED=true
```

Do not rename them to `NEXT_PUBLIC_*` or `VITE_*`. They are server-side values.

## Resend

Verify `enash.co.za` in Resend and configure `RESEND_API_KEY`. The sender in `RESEND_FROM_EMAIL` must be allowed by the verified domain. Forms are delivered to `ENASH_CONTACT_TO`.

## Azure OpenAI / Microsoft Foundry

Use an Azure OpenAI **v1 endpoint** ending at `/openai/v1` or `/openai/v1/`, a valid API key, and the deployment/model name in `AZURE_OPENAI_MODEL`. The server calls the Responses API at `${AZURE_OPENAI_ENDPOINT}/responses`.

## Azure App Service replacement

This project can replace the current React source in the same GitHub repository. Keep the existing custom domain in Azure App Service; replacing application code does not require changing the domain.

Recommended Azure settings:

- Runtime: Node.js 20 LTS or newer supported LTS.
- Startup command: `npm run start`
- `SCM_DO_BUILD_DURING_DEPLOYMENT=true` when Azure/Oryx is expected to install dependencies and build source during deployment.
- Copy the `.env.example` key names into **App Service > Environment variables** and supply the production values there.
- Do not commit `.env` or secrets to GitHub.

If the existing GitHub Actions workflow builds the app itself, it must run `npm ci` and `npm run build` before deployment. If the workflow only ships source to App Service, enable App Service build automation with `SCM_DO_BUILD_DURING_DEPLOYMENT=true`.

## SEO after deployment

1. Keep the preferred hostname stable. `PUBLIC_SITE_URL` must match the canonical production hostname.
2. Verify these URLs return 200:
   - `/`
   - `/about`
   - `/services`
   - `/sitemap.xml`
   - `/robots.txt`
3. In Google Search Console, resubmit `https://www.enash.co.za/sitemap.xml` (or the exact hostname configured in `PUBLIC_SITE_URL`).
4. Use URL Inspection for the home page, `/services`, and the six new service pages and request indexing.
5. Keep old indexed routes working or permanently redirected. Do not remove `/about` or `/services`.

SEO implementation can improve crawlability and relevance, but no site can guarantee immediate ranking or a specific Google position. Search visibility also depends on competition, content quality, links/mentions, user demand and time.
