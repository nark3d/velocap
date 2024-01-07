import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'velocap-app-custom-banner',
  templateUrl: './custom-banner.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    MatIconModule
  ],
  styleUrls: ['./custom-banner.component.scss']
})
export class CustomBannerComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() icon!: string;
  @Input() content!: string;
  @Input() actions!: string;
}
