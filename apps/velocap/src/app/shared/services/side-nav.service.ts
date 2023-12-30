import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  public toggleBehaviour: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }

  public toggle() {
    this.toggleBehaviour.next(!this.toggleBehaviour.getValue());
  }
}
