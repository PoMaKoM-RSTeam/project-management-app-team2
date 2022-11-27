import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ChangeLanguageService } from '../services/changeLanguage.service';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private route: Router,
    private changeLanguageService: ChangeLanguageService,
  ) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.changeLanguageService.getFromLocalStorage('login')) {
      this.route.navigate(['/']);
      return false;
    }
    return true;
  }
}
