import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { StorageKeys } from '../../core/models/project-manager.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private changeLanguageService: ChangeLanguageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.changeLanguageService.getFromLocalStorage(StorageKeys.Token);
    if (request.url.includes('.json')) {
      return next.handle(request);
    }
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
