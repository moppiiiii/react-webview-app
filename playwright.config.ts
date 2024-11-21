import { defineConfig, devices } from '@playwright/test';

/**
 * テスト対象のURL
 */
const basePath = 'http://localhost:5173' as const;

export default defineConfig({
  testDir: './src/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: basePath,
    trace: 'retry-with-trace',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: {
    command: 'pnpm dev',
    url: basePath,
    reuseExistingServer: !process.env.CI,
  },
});
