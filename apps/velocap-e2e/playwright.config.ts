import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { nxE2EPreset } from '@nx/playwright/preset';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

// const testDir = defineBddConfig({
//   paths: ['src/features/**/*.feature'],
//   require: ['src/steps/**/*.ts'],
// });

const testDir = defineBddConfig({
  importTestFrom: './steps/fixtures.ts',
  paths: ['./src/features'],
  require: ['src/steps/*.ts'],
  quotes: 'backtick',
  featuresRoot: './src/features',
});

console.log('testDir', nxE2EPreset(__filename, { testDir }));

export default defineConfig({
  testDir,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    baseURL
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

console.log('defineConfig', defineConfig({
  testDir,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    baseURL
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
}));
