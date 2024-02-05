import { Route } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SettingsComponent } from './features/settings/settings.component';
import { JiraIssuesComponent } from './features/jira-issues/jira-issues.component';

export const appRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'jira-issues', component: JiraIssuesComponent },
  { path: 'settings', component: SettingsComponent }
];
