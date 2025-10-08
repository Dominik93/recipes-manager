import { Injectable } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  public showNotification(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 5000,
      data: message
    });
  }
}
