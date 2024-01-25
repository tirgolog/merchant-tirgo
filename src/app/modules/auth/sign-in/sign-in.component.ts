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
import { FuseAlertComponent } from '@fuse/components/alert';
import { AuthService } from 'app/modules/auth/auth.service';
import { UserService } from 'app/shared/services/user/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})

export class AuthSignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  signInForm: UntypedFormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: ['dev@tirgo.uz', [Validators.required, Validators.email]],
      password: ['123', Validators.required],
    });
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();
    this.authService.signIn(this.signInForm.value).subscribe(
      (response) => {
        this.signInForm.enable();
        if (response.success) {
          if (localStorage.getItem("merchant")) {
            let curUser: any = jwtDecode(localStorage.getItem("merchant"));
            this.authService.getMerchantById(curUser.merchantId).subscribe(
              (res: any) => {
                if (res.success) {
                  this.userService.user = res.data;
                  if (this.userService._user.value.completed && this.userService._user.value.verified) {
                    this.authService._authenticated = true;
                    this.router.navigate(['dashboards']);
                  } else if (!this.userService._user.value.completed || !this.userService._user.value.verified) {
                    this.router.navigate(['auth/sign-up/step2']);
                  }
                }
              },
            );
          }
        }
      });
  }

}
