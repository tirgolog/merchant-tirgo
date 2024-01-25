import { NgIf, NgClass, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/modules/auth/auth.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'app/shared/services/upload.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'auth-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatCheckboxModule, MatIconModule, NgClass, MatSelectModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgxMatIntlTelInputComponent],
})
export class Step2Component implements OnInit {
  API_URL = 'https://merchant.tirgo.io/api/v1/file/download/'
  toastr = inject(ToastrService);
  @ViewChild('signUpNgForm') signUpNgForm: NgForm;
  signUpForm: FormGroup;

  passportFile: FileList;
  passportNames: string[] = [];

  certificateFile: FileList;
  certificateNames: string[] = [];

  selectedFiles: FileList;
  selectedFileNames: string[] = [];

  transportationCertificateFile: FileList;
  transportationCertificateNames: string[] = [];

  merchant: any;
  currencies: any;
  showBankAccount2: boolean = false;
  showTrashIcon: boolean = false;
  data;
  currentUser
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.data = { certificate_registration: '', supervisor_passport: '' };
    this.currentUser = jwtDecode(localStorage.getItem('merchant'));
    this.authService.getMerchantById(this.currentUser.merchantId).subscribe((res: any) => {
      if (res.success) {
        this.merchant = res.data;
        if (this.merchant.supervisorFirstName) {
          this.router.navigate(['auth/sign-up/step3'])
        }
      }
    })

    this.signUpForm = this.formBuilder.group({
      id: [''],
      companyName: [''],
      companyType: [''],
      password: [''],
      email: [''],
      supervisorFirstName: ['', [Validators.required]],
      supervisorLastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      responsiblePersonFistName: ['', [Validators.required]],
      responsiblePersonLastName: ['', [Validators.required]],
      responsbilePersonPhoneNumber: ['', [Validators.required]],
      factAddress: [''],
      address: ['', [Validators.required]],
    });
  }

  signUp() {
    this.signUpForm.disable();

    this.signUpForm.patchValue({
      id: this.merchant.id,
      companyName: this.merchant.companyName,
      companyType: this.merchant.companyType,
      password: this.merchant.password,
      email: this.merchant.email
    });

    if (this.signUpForm.value.supervisorFirstName === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Имя руководителя');
    }
    else if (this.signUpForm.value.supervisorLastName === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Фамилия руководителя');
    }
    else if (this.signUpForm.value.phoneNumber === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Телефон руководителя');
    }
    else if (this.signUpForm.value.responsiblePersonFistName === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Имя ответственного лица');
    }
    else if (this.signUpForm.value.responsiblePersonLastName === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Фамилия ответственного лица');
    }
    else if (this.signUpForm.value.responsbilePersonPhoneNumber === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Телефон ответственного лица');
    }
    else if (this.signUpForm.value.address === '') {
      this.signUpForm.enable();
      this.toastr.error('Требуется указать Юридический адрес');
    }
    else {
      this.authService.merchantUpdate(this.signUpForm.value).subscribe((res: any) => {
        if (res.success) {
          this.signUpForm.enable();
          this.router.navigate(['auth/sign-up/step3']);
        }

      }, error => {
        this.signUpForm.enable();
        this.toastr.error(error.message);
      })
    }
  }

  selectFile(event: any, name: string) {
    if (name == "logo") this.selectedFileNames = event.target.files[0].name;
    if (name == "certificate_registration") this.certificateNames = event.target.files[0].name;
    if (name == "supervisor_passport") this.passportNames = event.target.files[0].name;
    if (name == "transportationCertificate") this.passportNames = event.target.files[0].name;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.uploadService.uploadAvatar(formData).subscribe(
      (response) => {
        if (response) {
          this.toastr.success("Файл успешно загружен");
          this.data[name] = response.filename;
        }
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }

}