import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/modules/auth/auth.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'auth-step-1',
  templateUrl: './step-1.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [MatStepperModule, MatCheckboxModule, MatIconModule, NgClass, MatSelectModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class Step1Component implements OnInit {

  toastr = inject(ToastrService);

  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup;
  phone: string;
  formFieldHelpers: string[] = [''];
  currentUser: any;
  merchant:any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.currentUser = jwtDecode(localStorage.getItem('merchant'));
    this.authService.getMerchantById(this.currentUser.merchantId).subscribe((res: any) => {
      if (res.success) {
        this.merchant = res.data;
        if(this.merchant.email) {
          this.router.navigate(['auth/sign-up/step2'])
        } 
      }
    })
    this.signUpForm = this.formBuilder.group({
      companyType: ['ООО', Validators.required],
      companyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: [this.phone],
      agreement: [false],
    });
    
  }

  signUp() {
    this.signUpForm.disable();

    if (this.signUpForm.value.confirmPassword && this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.signUpForm.enable();
      this.toastr.error('Пароль не совпадает');
    }
    else if (this.signUpForm.value.companyType === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать тип компании');
    }
    else if (this.signUpForm.value.email === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать электронная почта');
    }
    else if (!this.signUpForm.value.email.includes('@')) {
      this.signUpForm.enable();
      this.toastr.error('Неверный формат электронной почты');
    }
    else if (this.signUpForm.value.companyName === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Наименование фирмы');
    }
    else if (this.signUpForm.value.password === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать пароль');
    }
    else if (this.signUpForm.value.confirmPassword === '') {
      this.signUpForm.enable();
      this.toastr.error('Подтвердить пароль');
    }
    else {
      this.signUpForm.enable();
      this.authService.merchantCreate(this.signUpForm.value).subscribe((res: any) => {
        if (res.success) {
          this.signUpForm.enable();
          this.router.navigate(['auth/sign-up/step2']);
          this.toastr.success("Мерчант успешно добавлен");
        }
      }, error => {
        if (error.error.message == "email must be an email") {
          this.signUpForm.enable();
          this.toastr.error('Неверный формат электронной почты');
        }
      })
    }
  }

}