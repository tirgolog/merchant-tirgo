import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { AuthService } from 'app/modules/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterLink],
})
export class AuthResetPasswordComponent implements OnInit {

  toastr = inject(ToastrService);
  @ViewChild('ngForm') ngForm: NgForm;
  email: string;
  form: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params.email;
    });
    this.form = this.formBuilder.group({
      confirmPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: [this.email]
    });
  }

  resetPassword() {
    this.form.disable();
    if (this.form.value.password == '') {
      this.form.enable();
      this.toastr.error('Введите пароль');
    }
    else if (this.form.value.confirmPassword == '') {
      this.form.enable();
      this.toastr.error('Введите пароль подтверждения');
    }
    else if (this.form.value.password !== this.form.value.confirmPassword) {
      this.form.enable();
      this.toastr.error('Пароль не совпадает');
    }
    else {
      this.authService.resetPassword(this.form.value).subscribe((res: any) => {
        if (res.success) {
          this.form.enable();
          this.toastr.success('Пароль успешно обновлен');
          this.router.navigate(['auth/sign-in'])
        }
      })
    }
  }
}
