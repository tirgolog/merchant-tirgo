import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CodeInputModule, RouterLink, NgIf, MatProgressSpinnerModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule, TextFieldModule, NgFor, MatCheckboxModule, NgClass, MatRippleModule, MatMenuModule, MatDialogModule, AsyncPipe],
})
export class VerificationCodeComponent implements OnInit {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  loading: boolean = false;
  countdown: number = 119;
  intervalId: any;
  count;
  smsCode: string;
  verifyCode: string;
  isCodeExpired: boolean = false;
  codeEntered: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<VerificationCodeComponent>,
  ) {
  }

  ngOnInit(): void {
    this.smsCode = this.data.code;
    this.startCountdown();
  }
  sendVerifyedCode() {
    this.loading = true;
    if (this.isCodeExpired) {
      this.loading = false;
      this.toastr.error('Срок действия SMS-кода истек. Пожалуйста, запросите новый.');
    }
    else if (this.smsCode !== this.verifyCode) {
      this.loading = false;
      this.toastr.error('Пароль не совпадает');
    }
    else {
      this.loading = false;
    }
  }
  retrySms() {
    this.loading = true;
    this.authService.verifyPhone({phone:this.data.phone, countryCode: this.data.countryCode})
      .subscribe(
        (response: any) => {
          if(response.success) {
            this.smsCode = response.data.code;
            this.loading = false;
            this.isCodeExpired = false;
            this.countdown = 119;
            this.startCountdown();
          }
        },
      );
  }
  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.countdown >= 0) {
        this.formatTime(this.countdown);
        this.countdown--;
      } else {
        this.stopCountdown();
        this.isCodeExpired = true;
      }
    }, 1000);
  }
  stopCountdown() {
    clearInterval(this.intervalId);
  }
  formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    this.count = `${"0"+minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    this.cdr.detectChanges();
  }
  closeModal() {
    this.dialogRef.close();
  }
  onCodeChanged(code: string) {
    code.length == 6 ? (this.codeEntered = true) : (this.codeEntered = false);
    this.verifyCode = code;
  }
  onCodeCompleted(code: string) {
    // if (this.verificationCode == this.verifyCode) {
    //   this.spinner.hide();
    //   this.registrationStart = true;
    //   this.codeEntered = true;
    // }
  }
}
