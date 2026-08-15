import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

function removePublicComplianceDownloads() {
  return {
    name: 'remove-public-compliance-downloads',
    closeBundle() {
      // Company documents are delivered by the Cloud Function only.
      // Remove any legacy public copies from the production build.
      rmSync(resolve(process.cwd(), 'dist', 'compliance'), { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), removePublicComplianceDownloads()],
  server: {
    port: 5173,
    host: true,
  },
});
