import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class TokenExpiredDialogService {
  private isTokenExpiredDialogOpen$$ = new BehaviorSubject(false);

  isTokenExpiredDialogOpen$ = this.isTokenExpiredDialogOpen$$.asObservable();

  constructor(
    private authService: AuthService,
  ) {}

  openTokenExpiredDialog() {
    this.isTokenExpiredDialogOpen$$.next(true);
  }

  closeTokenExpiredDialog() {
    this.isTokenExpiredDialogOpen$$.next(false);
    this.authService.logout();
  }
}
