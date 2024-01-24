import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { AuthService } from 'app/modules/auth/auth.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

@Component({
  selector: 'auth-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, NgIf, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class AuthVerifyPhoneComponent implements OnInit {
  @ViewChild('verifyPhoneNgForm') verifyPhoneNgForm: NgForm;
  @ViewChild('phone') phone: NgxMatIntlTelInputComponent;
  verifyPhoneForm: FormGroup;
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  phoneCountry: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.verifyPhoneForm = this.formBuilder.group({
      phone: ['', [Validators.required]],
      countryCode: ['uz', [Validators.required]]
    });
  }

  verifyPhone() {
    if (!this.verifyPhoneForm.value.phone) {
      this.toastr.error('Введите номер телефона');
    }
    else {
      this.verifyPhoneForm.patchValue({
        countryCode: this.phone.selectedCountry.iso2
      });
      this.verifyPhoneForm.disable();
      this.authService.verifyPhone(this.verifyPhoneForm.value)
        .subscribe(
          (response:any) => {
            this.showVerifyCode(response.data)
            this.verifyPhoneForm.enable();
          },
        );
    }
  }

  showVerifyCode(data) {
    const dialogRef = this.dialog.open(VerificationCodeComponent, {
      autoFocus: false,
      disableClose: true ,
      data: {
        countryCode: this.phone.selectedCountry.iso2,
        phone: this.verifyPhoneForm.value.phone,
        code: data.code
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.verifyPhoneForm.enable();
    });
  }

}


