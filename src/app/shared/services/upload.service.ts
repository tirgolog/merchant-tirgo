import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, map, switchMap, take, tap } from "rxjs";

const API_URL = 'https://merchant.tirgo.io/api/v1'

@Injectable({ providedIn: 'root' })

export class UploadService {
  constructor(
    private http: HttpClient
  ) { }

  uploadAvatar(data): Observable<any> {
    const sUrl = API_URL + '/file/upload';
    return this.http.post<any>(sUrl, data);
  }
}