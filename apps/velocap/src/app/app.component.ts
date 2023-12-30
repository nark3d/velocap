import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SideNavService } from './shared/services/side-nav.service';

@Component({
  selector: 'velocap-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public mobile = true;

  constructor(private observer: BreakpointObserver, private sideNavService: SideNavService) {}
  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.mobile = screenSize.matches;
    });
    this.sideNavService.toggleBehaviour.subscribe(async () => {
      this.sidenav && await this.sidenav.toggle();
    });
  }
}
