import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../core/services/localStorage.service';
import { StorageKeys } from '../../core/models/project-manager.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getFromLocalStorage(StorageKeys.Token);
    if (!token || request.url.includes('sign')) {
      const replacedUnAuthRequest = request.clone({
        url: `${environment.PATH}:${environment.PORT}/${request.url}`,
      });
      return next.handle(replacedUnAuthRequest);
    }

    const replacedAuthRequest = request.clone({
      url: `${environment.PATH}:${environment.PORT}${request.url}`,
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(replacedAuthRequest);
  }
}
