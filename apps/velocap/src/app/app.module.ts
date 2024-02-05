import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { SideNavService } from './shared/services/side-nav.service';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from './modules/theme/theme.module';
import { NotificationModule } from './modules/alert/notification.module';
import { SettingsComponent } from './features/settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { JiraComponent } from './features/settings/jira/jira.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CustomBannerComponent } from './shared/components/custom-banner/custom-banner.component';
import { NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JiraIssuesComponent } from './features/jira-issues/jira-issues.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IssuesTableComponent } from './features/jira-issues/issues-table/issues-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AppComponent,
    SettingsComponent,
    JiraComponent,
    JiraIssuesComponent,
    IssuesTableComponent
  ],
  imports: [
    NotificationModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    MatSelectModule,
    HttpClientModule,
    ThemeModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    CustomBannerComponent,
    NgOptimizedImage,
    MatTooltipModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
