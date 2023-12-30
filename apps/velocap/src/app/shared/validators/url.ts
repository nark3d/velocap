import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UrlValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const url = control.value;
    if (!url) return null;

    const regex = new RegExp(
      '^(https?://)?(www.)?' +
        '[a-zA-Z0-9@:%._\\+~#?&//=]' +
        '{2,256}\\.[a-z]' +
        '{2,6}\\b([-a-zA-Z0-9@:%' +
        '._\\+~#?&//=]*)'
    );
    return regex.test(url) ? null : { invalidUrl: true };
  }

}
