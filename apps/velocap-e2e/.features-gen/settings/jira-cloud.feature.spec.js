/** Generated from: src/features/settings/jira-cloud.feature */
import { test } from "../../src/steps/fixtures.ts";

test.describe(`Connect to Jira Cloud`, () => {

  test.beforeEach(async ({ Given, navigate }) => {
    await Given(`I am on the "settings" page`, null, { navigate });
  });

  test(`Text "Jira Cloud" should be present on the page`, async ({ Then, elements }) => {
    await Then(`I should see "Jira Cloud" text on the page`, null, { elements });
  });

  test(`Form is displayed`, async ({ Then, elements }) => {
    await Then(`I should see the "jiraCloud" "form" element`, null, { elements });
  });

  test(`Form elements are displayed`, async ({ And, elements }) => {
    await And(`I should see the "jiraUrl" "input" element`, null, { elements });
    await And(`I should see the "jiraEmail" "input" element`, null, { elements });
    await And(`I should see the "jiraToken" "input" element`, null, { elements });
    await And(`I should see the "jiraProject" "mat-select" element`, null, { elements });
    await And(`I should see the "jiraSubmit" "button" element`, null, { elements });
    await And(`I should see the "jiraConnect" "button" element`, null, { elements });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
});