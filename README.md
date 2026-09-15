# ENASH product company website

A full-stack React + Express website designed for Azure App Service.

## Public positioning

The public website presents ENASH as a South African technology product company with an ENASH-owned product portfolio:

- Yenza AI
- TaxiFind
- KitchCore
- What's There?

The site intentionally avoids public agency / consultancy positioning and does not advertise bespoke client development. This matches ENASH's current product-led direction. Keep future edits factually accurate; do not invent traction, customers, funding, certifications, or features simply to satisfy a startup program.

## Stack

- React 19 + Vite frontend
- Express backend
- Resend for contact email
- Microsoft Foundry / Azure OpenAI Responses API for the ENASH Assistant
- Designed for one Azure App Service deployment

## Local setup

1. Install Node.js 20 or newer.
2. In the project root:

```bash
npm install
```

3. Open `.env` and add your Resend and Microsoft Foundry details.
4. Start the API in terminal 1:

```bash
npm run dev:server
```

5. Start Vite in terminal 2:

```bash
npm run dev
```

6. Open `http://localhost:5173`.

The Vite dev server proxies `/api/*` to the Express API on port 8080.

## Production build

```bash
npm run build
NODE_ENV=production npm start
```

The Express server serves the built React files from `dist/` and handles `/api/contact`, `/api/assistant`, and `/api/health`.

## Contact email

The backend sends website messages to:

`thendos@enash.co.za`

Set these values before using the form:

```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=ENASH Website <website@enash.co.za>
ENASH_CONTACT_TO=thendos@enash.co.za
```

`enash.co.za` must be verified in Resend first. Microsoft Entra domain verification and Resend domain verification are separate processes.

## AI assistant

Set:

```env
AZURE_OPENAI_ENDPOINT=https://YOUR-RESOURCE.openai.azure.com/openai/v1/
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_MODEL=YOUR_DEPLOYMENT_NAME
```

The model name is the deployment name in Microsoft Foundry. The API key stays on the Express server and is never exposed to the browser.

## Security notes

- Do not rename secrets to `VITE_*`; Vite exposes `VITE_*` variables to browser code.
- In production, use Azure App Service Application settings instead of uploading a populated `.env` into source control.
- The included `.env` contains blank placeholders only.
- The server includes basic input validation, honeypot handling, HTML escaping and per-IP in-memory rate limiting.

## Branding

The site uses the supplied ENASH wordmark and a new multi-colour favicon / compact brand mark based on the colours in the wordmark. Raleway is loaded from Google Fonts so the project does not need to redistribute a font file.

## September 2026 content cleanup

- The combined `/products` page has been removed from public navigation and now redirects to the home page.
- Product tiles on the home page open the relevant product page directly.
- The home page no longer repeats product counts or portfolio wording.
- Product pages now use fewer headings and longer, concrete explanations of the problem, product response and core product experiences.
- Interactive product previews remain in place.
- Navigation is limited to About, Company and Contact; the existing footer product links remain direct product links.
