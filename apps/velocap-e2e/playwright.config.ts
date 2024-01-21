import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  importTestFrom: 'src/steps/fixtures.ts',
  paths: ['./src/features/**/*.ts'],
  require: ['src/steps/*.ts'],
  quotes: 'backtick',
  featuresRoot: './src/features',
});

export default defineConfig({
  testDir,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ]
});
