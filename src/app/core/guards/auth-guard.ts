import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private route: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!localStorage.getItem('login')) {
      this.route.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
