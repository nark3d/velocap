import { Component } from '@angular/core';
import { SideNavService } from '../../shared/services/side-nav.service';

@Component({
  selector: 'velocap-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private sideNavService: SideNavService) {}

  public toggleSideNav() {
    this.sideNavService.toggle();
  }
}
