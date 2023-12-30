import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'velocap-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, className: string, action: string, icon: string },
              private snackBarRef: MatSnackBarRef<NotificationComponent>
  ) {}

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
