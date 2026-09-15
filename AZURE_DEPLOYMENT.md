# Deploy ENASH to Azure App Service

## 1. Create the Web App

In Azure Portal:

1. Create or open a Resource Group for ENASH.
2. Create **App Service > Web App**.
3. Publish: **Code**.
4. Runtime stack: **Node 20 LTS or newer**.
5. Operating system: **Linux**.
6. Pick an App Service plan appropriate for your expected traffic.
7. Create the Web App.

The root `package.json` contains `npm start`, so App Service can start the Express server with `node server/index.js`. Leave the App Service startup command blank at first; if you ever need to set it manually, use `npm start`.

## 2. Configure environment variables

Open:

**Web App > Settings > Environment variables / Configuration > Application settings**

Add:

- `NODE_ENV` = `production`
- `PUBLIC_SITE_URL` = `https://enash.co.za`
- `ENASH_CONTACT_TO` = `thendos@enash.co.za`
- `RESEND_API_KEY` = your Resend API key
- `RESEND_FROM_EMAIL` = `ENASH Website <website@enash.co.za>`
- `AZURE_OPENAI_ENDPOINT` = your Azure OpenAI v1 endpoint
- `AZURE_OPENAI_API_KEY` = your Microsoft Foundry / Azure OpenAI API key
- `AZURE_OPENAI_MODEL` = your model deployment name
- `AI_ASSISTANT_ENABLED` = `true`
- `SCM_DO_BUILD_DURING_DEPLOYMENT` = `true`

Save the settings and restart the Web App.

## 3. Verify enash.co.za in Resend

Inside Resend:

1. Add the domain `enash.co.za`.
2. Resend will show DNS records for the domain.
3. Add those records where your DNS is hosted.
4. Wait until Resend shows the domain as verified.
5. Create an API key.
6. Put that key in the Azure `RESEND_API_KEY` Application setting.

If your domain already receives mail through Microsoft 365/Outlook, do **not** delete or replace your existing root-domain Microsoft 365 MX records. Add the Resend DNS records exactly as Resend provides them; Resend normally uses its own `send` subdomain/return-path records for sending authentication.

The contact form is already coded to deliver to `thendos@enash.co.za`.

## 4. Get Microsoft Foundry values

For the Azure OpenAI deployment used by the assistant, obtain:

- resource endpoint in the form `https://YOUR-RESOURCE.openai.azure.com/openai/v1/`
- API key
- deployment name for the model

Use the **Azure OpenAI v1 endpoint** for the deployed model. Do not paste a Foundry project URL ending in `/api/projects/...` into `AZURE_OPENAI_ENDPOINT`.

Put those values into the Azure Application settings shown above. The website backend calls the Responses API and keeps the API key server-side.

## 5. Deploy the source ZIP

From Azure CLI, after signing in:

```bash
az login
az webapp config appsettings set \
  --resource-group YOUR_RESOURCE_GROUP \
  --name YOUR_WEB_APP_NAME \
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true NODE_ENV=production

az webapp deploy \
  --resource-group YOUR_RESOURCE_GROUP \
  --name YOUR_WEB_APP_NAME \
  --src-path ENASH_Azure_Product_Site.zip \
  --type zip
```

The ZIP contains source code rather than `node_modules`. Azure installs packages during deployment and runs the Vite production build when build automation is enabled.

If you prefer GitHub deployment, connect the repository under **Deployment Center**; keep the same Azure Application settings.

## 6. Check the deployment

Open:

`https://YOUR_WEB_APP_NAME.azurewebsites.net/api/health`

You should see JSON showing:

- `ok: true`
- `emailConfigured: true`
- `aiConfigured: true`

Then test:

1. Contact form submission.
2. Receipt in `thendos@enash.co.za`.
3. Confirmation email to the sender.
4. ENASH Assistant question.
5. Each live product link.

## 7. Connect enash.co.za

In the Web App, open **Custom domains** and add:

- `enash.co.za`
- `www.enash.co.za` (recommended)

Azure will provide the exact DNS validation records. Add them at your DNS host, validate the hostnames, then enable the App Service managed TLS certificate and HTTPS-only mode.

The custom-domain verification you already completed in Microsoft Entra does not automatically attach the domain to App Service; App Service performs its own hostname validation.
