import { test as base } from 'playwright-bdd';
import { Navigate } from './navigate';
import { Elements } from './elements';

export const test = base.extend<{
  elements: Elements,
  navigate: Navigate,
  browserSpecificTest: void
}>({
  elements: async ({ page }, use) => use(new Elements(page)),
  navigate: async ({ page}, use): Promise<void> => use(new Navigate(page)),
  browserSpecificTest: [async ({ $tags }, use, testInfo) => {
    if ($tags.includes('@firefox') && testInfo.project.name !== 'firefox') {
      testInfo.skip();
    }
    await use();
  }, { auto: true }],
});
