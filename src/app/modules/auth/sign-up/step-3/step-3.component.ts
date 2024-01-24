import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/modules/auth/auth.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective } from 'ngx-mask';
import { jwtDecode } from 'jwt-decode';
import { AlertService } from 'app/shared/services/alert.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'auth-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  providers: [AlertService],
  imports: [MatSnackBarModule, NgxMaskDirective, MatStepperModule, CommonModule, MatCheckboxModule, MatIconModule, NgClass, MatSelectModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class Step3Component implements OnInit {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup;
  merchant: any;
  phone: string;
  id: number;
  currencies: any;
  showBankAccount2: boolean = false;
  showTrashIcon: boolean = false;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.currentUser = jwtDecode(localStorage.getItem('merchant'));
    this.authService.getMerchantById(this.currentUser.merchantId).subscribe((res: any) => {
      if (res.success) {
        this.merchant = res.data;
      }
    })

    this.signUpForm = this.formBuilder.group({
      currency: ['', [Validators.required]],
      bankAccount: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(20), Validators.pattern('^[0-9]*$')]],
      currency2: [''],
      bankAccount2: ['', [Validators.minLength(20), Validators.maxLength(20), Validators.pattern('^[0-9]*$')]],
      bankName: ['', [Validators.required]],
      inn: ['', [Validators.required]],
      taxPayerCode: ['', [Validators.required]],
      oked: ['', [Validators.required]],
      mfo: ['', [Validators.required, Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('^[0-9]*$')]],
      dunsNumber: [''],
      ibanNumber: [''],
      notes: [''],
    });

    this.authService.getCurrencies().subscribe((res: any) => {
      if (res.success) {
        this.currencies = res.data;
        this.signUpForm.patchValue({ currency: this.currencies[0].id, currency2: this.currencies[0].id });
      }
    })
  }

  signUp() {
    this.signUpForm.disable();
  }

  toggleShowBankAccount2() {
    this.showBankAccount2 = !this.showBankAccount2;
    this.showTrashIcon = !this.showTrashIcon;
  }

}