import { Page } from '@playwright/test';
import { Fixture, Given } from 'playwright-bdd/dist/decorators';
import type { test } from './fixtures';

export @Fixture<typeof test>('navigate') class Navigate {
  private location = 'http://localhost:4200';
  constructor(public page: Page) {}

  @Given('I am on the {string} page')
  public async onThePage(page: string): Promise<void> {
    await this.page.goto(`${location}/${page}`);
  }
}
