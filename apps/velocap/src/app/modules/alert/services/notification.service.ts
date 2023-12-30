import { Injectable } from '@angular/core';
import { QueueService } from '../../../shared/services/queue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification.component';

interface Notification {
  message: string;
  className: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends QueueService<Notification> {

  constructor(private snackBar: MatSnackBar) {
    super();
  }

  open(
    message: string,
    className: string,
    icon: string
  ) {
    return this.snackBar.openFromComponent(NotificationComponent, {
      data: { message, action: 'Close', icon },
      panelClass: [className],
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  error(message: string) {
    this.add({ message, className: 'error', icon: 'warning'});
  }

  success(message: string) {
    this.add({ message, className: 'success', icon: 'check_circle'});
  }

  info(message: string) {
    this.add({ message, className: 'info', icon: 'info_circle'});
  }

  override processItem(
    { message, className, icon }: Notification,
    callback: () => void,
  ): void {
    this.open(message, className, icon).afterDismissed().subscribe(callback);
  }
}
