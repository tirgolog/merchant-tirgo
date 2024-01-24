import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { AuthService } from 'app/modules/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VerificationCodeForgotComponent } from './components/verification-code.component';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [NgIf, FuseAlertComponent, MatDialogModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, RouterLink],
})
export class AuthForgotPasswordComponent implements OnInit {
  toastr = inject(ToastrService);
  @ViewChild('forgotPasswordNgForm') ngForm: NgForm;

  form: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendCode() {
    if (this.form.value.email == '') {
      this.toastr.error("Введите электронный почта");
    }
    else {
      this.form.disable();
      this.authService.sendEmail({ email: this.form.value.email }).subscribe((res: any) => {
        if (res.success) {
          this.toastr.success("Sms-код будет отправлен на вашу электронную почту");
          this.showVerifyCode(this.form.value.email)
        }
        else if (res.errors[0] == "Create data failed") {
          this.toastr.error("Адрес электронной почты не найден");
          this.form.enable();
        }
      },
        (error) => {
          if (error.error.message == "email must be an email") {
            this.toastr.error("Неверный формат электронной почты");
            this.form.enable();
          }
        }
      )
    }

  }

  showVerifyCode(data) {
    const dialogRef = this.dialog.open(VerificationCodeForgotComponent, {
      autoFocus: false,
      disableClose: true,
      data: {email:data}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.form.enable();
    });
  }

}
