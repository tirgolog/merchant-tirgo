import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Check if the device is offline
    if (!navigator.onLine) {
      // Handle offline mode (e.g., store requests for later)
      console.error('Device is offline. Request not sent:', request.url);
      return throwError(new HttpErrorResponse({ status: 0, statusText: 'Offline' }));
    }

    return next.handle(request);
  }
}