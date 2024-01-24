// alert.service.ts

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertButton, AlertComponent } from '../layouts/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private dialog: MatDialog) {}

  showAlert(message: string, icon: string, panelClass: string, buttons?: AlertButton[]): Observable<void> {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '300px',
      data: { message, icon, panelClass, buttons },
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }
}
