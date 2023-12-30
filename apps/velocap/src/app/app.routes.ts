import { Route } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SettingsComponent } from './features/settings/settings.component';

export const appRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent }
];
