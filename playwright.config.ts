import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './.cache/playwright-results',
  use: { baseURL: 'http://127.0.0.1:4322', browserName: 'chromium' },
  webServer: [
    {
      command: 'npm run preview -- --host 127.0.0.1 --port 4322 --strictPort',
      url: 'http://127.0.0.1:4322',
      reuseExistingServer: false,
    },
    {
      command: 'npm run dev -- --port 4321 --strictPort',
      url: 'http://localhost:4321',
      reuseExistingServer: true,
    },
  ],
});
