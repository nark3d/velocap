import {ThemeStorage} from './theme-storage';
import { ThemeInterface } from '../types/theme.interface';

const testStorageKey = ThemeStorage.storageKey;
const testTheme: ThemeInterface = {
  primary: '#000000',
  accent: '#ffffff',
  name: 'test-theme'
};

describe('ThemeStorage Service', () => {
  const service = new ThemeStorage();
  const getCurrTheme = () => window.localStorage.getItem(testStorageKey);
  const secondTestTheme = {
    primary: '#666666',
    accent: '#333333',
    name: 'other-test-theme'
  };

  beforeEach(() => {
    window.localStorage[testStorageKey] = testTheme.name;
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should set the current theme name', () => {
    expect(getCurrTheme()).toEqual(testTheme.name);
    service.storeTheme(secondTestTheme);
    expect(getCurrTheme()).toEqual(secondTestTheme.name);
  });

  it('should get the current theme name', () => {
    const theme = service.getStoredThemeName();
    expect(theme).toEqual(testTheme.name);
  });

  it('should clear the stored theme data', () => {
    expect(getCurrTheme()).not.toBeNull();
    service.clearStorage();
    expect(getCurrTheme()).toBeNull();
  });

  it('should emit an event when setTheme is called', () => {
    jest.spyOn(service.onThemeUpdate, 'emit');
    service.storeTheme(secondTestTheme);
    expect(service.onThemeUpdate.emit).toHaveBeenCalled();
    expect(service.onThemeUpdate.emit).toHaveBeenCalledWith(secondTestTheme);
  });
});
