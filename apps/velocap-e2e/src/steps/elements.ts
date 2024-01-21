import { Fixture, Then } from 'playwright-bdd/decorators';
import type { test } from './fixtures';
import { Page, expect } from '@playwright/test';

export
@Fixture<typeof test>('elements')
class Elements {
    constructor(public page: Page) {}

    @Then(/^I should see the "([^"]*)" "([^"]*)" element$/)
    public async element(id: string, elementType: string) {
      expect(await this.page.waitForSelector(`${elementType}#${id}`)).toBeTruthy();
    }

    @Then(/^I should see "([^"]*)" text on the page$/)
    public async text(text: string) {
      await this.page.waitForSelector(`text=${text}`);
      const hasText = await this.page.textContent(`body`);
      expect(hasText).toContain(text);
    }
}
