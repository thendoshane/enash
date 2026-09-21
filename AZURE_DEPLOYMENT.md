# Replace the current React deployment with this Next.js site

## Before touching production

1. Download/clone the current GitHub repository and create a backup branch, for example `backup-react-site`.
2. Confirm Azure App Service is still connected to the intended repository and production branch in **Deployment Center**.
3. Keep the current custom domain and TLS bindings unchanged.

## Replace the source

1. Remove the old React application files from the production branch, but keep `.git` and any deployment workflow that you intend to reuse.
2. Copy the contents of this Next.js project into the repository root.
3. Do **not** copy a local `.env` file into GitHub.
4. Commit and push.

## Azure App Service configuration

In **Azure Portal > App Service > Settings > Environment variables**, keep/add these exact names:

- `PORT`
- `NODE_ENV`
- `PUBLIC_SITE_URL`
- `ENASH_CONTACT_TO`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_API_KEY`
- `AZURE_OPENAI_MODEL`
- `AI_ASSISTANT_ENABLED`

Also add `SCM_DO_BUILD_DURING_DEPLOYMENT=true` if App Service/Oryx is responsible for building the source after GitHub deploys it.

Set the App Service startup command to:

```text
npm run start
```

The project start script binds Next.js to `0.0.0.0`; Next.js uses the `PORT` environment variable.

## GitHub Actions

If the existing workflow builds before deployment, the Node steps should include:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'npm'

- run: npm ci
- run: npm run build
```

Then keep the existing Azure authentication and `azure/webapps-deploy` step for the same App Service.

If your current Azure-generated workflow only deploys source, keep it and use `SCM_DO_BUILD_DURING_DEPLOYMENT=true` so App Service performs the dependency install/build.

## First production checks

After the deployment succeeds:

1. Open the home page and every navigation item.
2. Submit a normal contact enquiry and confirm the Resend email arrives.
3. Submit a company-document request and procurement request.
4. Open `/request`, switch to AI-assisted discovery and confirm Azure OpenAI replies.
5. Verify `/sitemap.xml` and `/robots.txt`.
6. Confirm `/about` and `/services` still load at the same indexed URLs.
7. Test one service URL, for example `/services/software-development`.
8. Confirm `https://www.enash.co.za` is the canonical hostname generated in page source.

## Google indexing

In Google Search Console:

1. Keep the existing property if it already covers the production hostname.
2. Submit the sitemap again.
3. Inspect and request indexing for the home page, `/services`, `/procurement`, and the six service pages.
4. Monitor Pages/Indexing and Core Web Vitals after deployment.

Do not change all existing URLs just for SEO. Preserving known URLs and using permanent redirects for renamed pages reduces unnecessary indexing disruption.

## Canonical domain note

The current Google result shown for ENASH uses the `www.enash.co.za` hostname. To reduce avoidable SEO churn, the example configuration keeps `PUBLIC_SITE_URL=https://www.enash.co.za`. If your Azure custom-domain setup intentionally uses the bare domain instead, use that value consistently and permanently redirect the other hostname to it. Do not serve both hostnames as separate indexable copies.
