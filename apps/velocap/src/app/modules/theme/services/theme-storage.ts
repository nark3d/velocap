import { Injectable, EventEmitter, ElementRef } from '@angular/core';
import { ThemeInterface } from '../types/theme.interface';
import { themes } from '../data/theme-data';

@Injectable({providedIn: 'root'})
export class ThemeStorage {
  static storageKey = 'docs-theme-storage-current-name';

  onThemeUpdate: EventEmitter<ThemeInterface> = new EventEmitter<ThemeInterface>();

  getCurrentTheme(): ThemeInterface | undefined {
    const themeName = this.getStoredThemeName();
    return themeName ? this.getTheme(themeName) : undefined;
  }
  getTheme(name: string): ThemeInterface | undefined {
    return themes.find(t => t.name === name);
  }

  storeTheme(theme: ThemeInterface) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch { }

    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch { }
  }
}
