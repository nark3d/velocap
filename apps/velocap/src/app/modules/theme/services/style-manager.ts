import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StyleManager {

  setStyle(key: string, href: string) {
    this.getLinkElementForKey(key).setAttribute('href', href);
  }

  removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    existingLinkElement && document.head.removeChild(existingLinkElement);
  }

  private getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.setLinkElement(this.createLinkElementWithKey(key));
  }

  private getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
  }

  private setLinkElement(linkEl: HTMLLinkElement) {
    return document.head.appendChild(linkEl);
  }

  private createLinkElementWithKey(key: string): HTMLLinkElement {
    return Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      classList: [this.getClassNameForKey(key)],
    });
  }

  private getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }
}
