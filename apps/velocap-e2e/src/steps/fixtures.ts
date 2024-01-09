import { test as base } from 'playwright-bdd';
import { Navigate } from './Navigate';

export const test = base.extend<{ navigate: Navigate, browserSpecificTest: void }>({

  navigate: async ({ page }, use) => use(new Navigate(page)),

  browserSpecificTest: [async ({ $tags }, use, testInfo) => {
    if ($tags.includes('@firefox') && testInfo.project.name !== 'firefox') {
      testInfo.skip();
    }
    await use();
  }, { auto: true }],
});
