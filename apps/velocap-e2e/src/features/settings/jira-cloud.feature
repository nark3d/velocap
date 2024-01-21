Feature: Connect to Jira Cloud

  Background:
    Given I am on the "settings" page

  Scenario: Text "Jira Cloud" should be present on the page
    Then I should see "Jira Cloud" text on the page

  Scenario: Form is displayed
    Then I should see the "jiraCloud" "form" element

  Scenario: Form elements are displayed
    And I should see the "jiraUrl" "input" element
    And I should see the "jiraEmail" "input" element
    And I should see the "jiraToken" "input" element
    And I should see the "jiraProject" "mat-select" element
    And I should see the "jiraSubmit" "button" element
    And I should see the "jiraConnect" "button" element


