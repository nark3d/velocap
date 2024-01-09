import { expect, test } from '@playwright/test';

test('has Jira Tab', async ({ page }) => {
  await page.goto('/settings');

  // Expect h1 to contain a substring.
  expect(await page.locator('.mdc-tab__text-label').getByText('Jira', {exact: true} ).innerText()).toContain('Jira');
});
