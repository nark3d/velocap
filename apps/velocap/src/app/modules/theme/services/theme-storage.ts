import {Injectable, EventEmitter} from '@angular/core';
import { ThemeInterface } from '../types/theme.interface';

@Injectable({providedIn: 'root'})
export class ThemeStorage {
  static storageKey = 'docs-theme-storage-current-name';

  onThemeUpdate: EventEmitter<ThemeInterface> = new EventEmitter<ThemeInterface>();

  storeTheme(theme: ThemeInterface) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme.name;
    } catch { }

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
