import {waitForAsync, TestBed} from '@angular/core/testing';
import { ThemePickerComponent } from './theme-picker.component';

describe('ThemePicker', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    }).compileComponents();
  }));

  it('should install theme based on name', () => {
    const fixture = TestBed.createComponent(ThemePickerComponent);
    const component = fixture.componentInstance;
    const name = 'pink-bluegrey';
    spyOn(component.styleManager, 'setStyle');
    component.selectTheme(name);
    expect(component.styleManager.setStyle).toHaveBeenCalled();
    expect(component.styleManager.setStyle).toHaveBeenCalledWith('theme', `${name}.css`);
  });
});
