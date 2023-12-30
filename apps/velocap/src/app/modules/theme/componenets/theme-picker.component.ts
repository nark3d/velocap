import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { StyleManager } from '../services/style-manager';
import { ThemeStorage } from '../services/theme-storage';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeInterface } from '../types/theme.interface';
import { themes } from '../data/theme-data';
import { MatIconRegistry } from '@angular/material/icon';
import { ThemePalette } from '@angular/material/core';
import { NotificationService } from '../../alert/services/notification.service';

@Component({
  selector: 'velocap-theme-picker',
  templateUrl: 'theme-picker.component.html',
  styleUrls: ['theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  private queryParamSubscription: Subscription | undefined;
  currentTheme: ThemeInterface | undefined;
  themes: ThemeInterface[] = themes;

  constructor(
    public styleManager: StyleManager,
    private themeStorage: ThemeStorage,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('theme-example',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/theme-demo-icon.svg'));
  }

  ngOnInit() {
    this.initCurrentTheme();
    this.subscribeToQueryParamChanges();
  }

  ngOnDestroy() {
    this.queryParamSubscription?.unsubscribe();
  }

  async selectTheme(themeName: string, notify: boolean) {
    const theme = this.themes.find(t => t.name === themeName);
    if (!theme) return;

    await this.applyTheme(theme, notify);
  }

  private initCurrentTheme() {
    const themeName =
      this.themeStorage.getStoredThemeName() || this.themes.find(t => t.isDefault)?.name;
    console.log('stored', this.themeStorage.getStoredThemeName());
    console.log('default', this.themes.find(t => t.isDefault)?.name);
    themeName && this.selectTheme(themeName, false);
  }

  getIconColor(theme: ThemeInterface): ThemePalette | undefined {
    return this.currentTheme === theme ? 'accent' : undefined;
  }

  private subscribeToQueryParamChanges() {
    this.queryParamSubscription = this.activatedRoute.queryParamMap
      .pipe(map((params: ParamMap) => params.get('theme')))
      .subscribe(themeName => {
        themeName && this.selectTheme(themeName, true);
      });
  }

  private async applyTheme(theme: ThemeInterface, notify: boolean) {
    this.currentTheme = theme;
    this.setThemeIfNotDefault(theme);
    notify && this.notificationService.success(`${theme.displayName || theme.name} theme selected.`);
    this.storeTheme(theme);
  }

  private storeTheme(theme: ThemeInterface) {
    this.themeStorage.storeTheme(theme);
  }

  private setThemeIfNotDefault(theme: ThemeInterface) {
    theme.isDefault
      ? this.styleManager.removeStyle('theme')
      : this.styleManager.setStyle('theme', `${theme.name}.css`);
  }
}
