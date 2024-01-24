import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUtils } from 'app/modules/auth/auth.utils';
import { UserService } from 'app/shared/services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  API_URL = 'https://merchant.tirgo.io/api/v1'

  public _authenticated: boolean = false;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}
  set accessToken(token: string) {
    localStorage.setItem('merchant', token);
  }
  get accessToken(): string {
    return localStorage.getItem('merchant') ?? '';
  }
  merchantCreate(data) {
    return this.http.post(this.API_URL + '/merchant', data);
  }
  MerchantComplete(data) {
    return this.http.post(this.API_URL + '/merchant', data);
  }
  merchantUpdate(data) {
    return this.http.put(this.API_URL + '/merchant', data);
  }
  verifyPhone(data) {
    return this.http.post(this.API_URL + '/users/phone-verify', data);
  }
  getMerchantById(id) {
    return this.http.get(this.API_URL + '/merchant/id?id=' + id);
  }
  signIn(credentials: { username: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }
    return this.http.post(this.API_URL + '/auth/login', credentials).pipe(
      switchMap((response: any) => {
        this.accessToken = response.data.access_token;
        return of(response);
      }),
    );
  }
  sendEmail(email) {
    return this.http.post(this.API_URL + '/users/send-code', email);
  }
  verifyCode(data) {
    return this.http.post(this.API_URL + '/users/verify-code', data);
  }
  resetPassword(data) {
    return this.http.patch(this.API_URL + '/users/reset-password', data);
  }
  
  signOut(): Observable<any> {
    localStorage.removeItem('merchant');
    this._authenticated = false;
    return of(true);
  }
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('api/auth/unlock-session', credentials);
  }
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    // return this.signInUsingToken();
    if (this.accessToken) {
      return of(true);
    }

  }
  getCurrencies() {
    return this.http.get(this.API_URL + '/currency/all');
  }
  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this.http.post('api/auth/sign-in-with-token', {
      accessToken: this.accessToken,
    }).pipe(
      catchError(() =>

        // Return false
        of(false),
      ),
      switchMap((response: any) => {
        // Replace the access token with the new one if it's available on
        // the response object.
        //
        // This is an added optional step for better security. Once you sign
        // in using the token, you should generate a new one on the server
        // side and attach it to the response object. Then the following
        // piece of code can replace the token with the refreshed one.
        if (response.accessToken) {
          this.accessToken = response.accessToken;
        }

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
        this.userService.user = response.user;

        // Return true
        return of(true);
      }),
    );
  }
}
