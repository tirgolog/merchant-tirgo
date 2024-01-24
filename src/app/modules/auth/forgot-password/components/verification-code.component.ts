import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
  host: { 'class': 'verification-code-forgot' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CodeInputModule, RouterLink, NgIf, MatProgressSpinnerModule, MatButtonModule, MatIconModule, ReactiveFormsModule, FormsModule, TextFieldModule, NgFor, MatCheckboxModule, NgClass, MatRippleModule, MatMenuModule, MatDialogModule, AsyncPipe],
})
export class VerificationCodeForgotComponent implements OnInit {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  loading: boolean = false;
  countdown: number = 119;
  intervalId: any;
  count;
  verifyCode: string;
  isCodeExpired: boolean = false;
  codeEntered: boolean = false;
  email: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<VerificationCodeForgotComponent>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.email = this.data.email;
    this.startCountdown();
  }
  sendVerifyedCode() {
    this.onCodeCompleted(this.verifyCode)
  }
  retrySms() {
    this.loading = true;
    this.authService.sendEmail({ email: this.email })
      .subscribe(
        (response: any) => {
          if (response.success) {
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
    this.count = `${"0" + minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
    this.verifyCode = code;
    if (this.codeEntered && !this.isCodeExpired) {
      this.authService.verifyCode({ email: this.email, code: +code }).subscribe((res: any) => {
        if (res.success) {
          this.loading = false;
          console.log(this.email);
          this.router.navigate(['auth/reset-password'], { queryParams: { email: this.email } });
          this.dialogRef.close();
        }
        else if (res.errors[0] == 'Code is Invalid') {
          this.loading = false;
          this.toastr.error('Пароль не совпадает');
        }
      })
    }
    else if (this.isCodeExpired) {
      this.loading = false;
      this.toastr.error('Срок действия SMS-кода истек. Пожалуйста, запросите новый.');
    }
  }
}