import { Fixture, Given } from 'playwright-bdd/decorators';
import type { test } from './fixtures';
import { Page } from '@playwright/test';

export
@Fixture<typeof test>('navigate')
class Navigate {

  private url = 'http://localhost:4200/'

  constructor(public page: Page) {}
  @Given('I am on the {string} page')
  public async to(page: string) {
    await this.page.goto(`${this.url}/${page}`);
  }
}
