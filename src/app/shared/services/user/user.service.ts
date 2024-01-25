import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/shared/services/user/user.types';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserService {
  API_URL = 'https://merchant.tirgo.io/api/v1'
  _user = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
  ) {  }

  set user(value: User) {
  this._user.next(value);
}

  get user$(): Observable < User > {
  return this._user.asObservable();
}

  get curUser(): User {
  return this._user.value;
}

get(id): Observable < User > {
  return this.http.get<User>(this.API_URL + '/users/id?id=' + id).pipe(
    tap((user) => {
      this._user.next(user);
    }),
  );
}

update(user: User): Observable < any > {
  return this.http.patch<User>('api/common/user', { user }).pipe(
    map((response) => {
      this._user.next(response);
    }),
  );
}

getAllUsers() {
  return this.http.get(this.API_URL + '/users')
}

}
