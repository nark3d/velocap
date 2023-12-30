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

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AppComponent,
    SettingsComponent,
    JiraComponent,
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
    MatCardModule
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent],
})
export class AppModule {}
