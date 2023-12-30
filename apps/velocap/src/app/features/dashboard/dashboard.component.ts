import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../modules/alert/services/notification.service';

@Component({
  selector: 'velocap-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor() {}
}
