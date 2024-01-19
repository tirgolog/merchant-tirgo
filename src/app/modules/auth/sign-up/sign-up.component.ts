import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,

  imports: [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class AuthSignUpComponent implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  // @ViewChild('phone') telInput: MatIntlTelInput;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signUpForm: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.signUpForm = this._formBuilder.group({
      phone: ["", [Validators.required]],
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.signUpForm.disable();
    this.showAlert = false;
    this._authService.signUp(this.signUpForm.value)
      .subscribe(
        (response) => {
          this.signUpForm.enable();
          this.signUpNgForm.resetForm();
          this.alert = {
            type: 'error',
            message: 'Wrong email or password',
          };
          this.showAlert = true;
        },
      );
  }
}