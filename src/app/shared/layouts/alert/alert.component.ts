import { CommonModule, NgClass } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { fuseAnimations } from '@fuse/animations';

export interface AlertData {
  message: string;
  icon: string;
  panelClass: string;
  buttons?: AlertButton[];
}

export interface AlertButton {
  label: string;
  callback: () => void;
}


@Component({
  selector: 'app-alert',
  template: `
    <mat-icon class="alert-icon">{{ data.icon }}</mat-icon>
    <div class="alert" [ngClass]="data.panelClass">
      {{ data.message }}
    </div>
    <div class="button-container">
      <button *ngFor="let button of data.buttons" mat-button (click)="onButtonClick(button)">
        {{ button.label }}
      </button>
    </div>
  `,
  styles: [`
    .alert {
      font-size: 14px;
      text-align: center;
      display: flex;
      align-items: center;
    }

    .alert-success {
      background-color: #4caf50;
    }

    .alert-error {
      background-color: #f44336;
    }

    .alert-icon {
      margin-right: 8px;
      font-size: 20px;
    }

    .button-container {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }
  `],
   encapsulation: ViewEncapsulation.None,
   animations: fuseAnimations,
   standalone: true,
   imports: [MatIconModule, NgClass,CommonModule]
})
export class AlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertData,
    public dialogRef: MatDialogRef<AlertComponent>,
  ) {}

  onButtonClick(button: AlertButton): void {
    button.callback();
    this.dialogRef.close();
  }
}
