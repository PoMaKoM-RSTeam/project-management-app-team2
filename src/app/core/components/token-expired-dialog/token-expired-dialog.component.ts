import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeLanguageService } from '../../services/changeLanguage.service';
import { TokenExpiredDialogService } from '../../services/tokenExpiredDialog.service';

@Component({
  selector: 'app-token-expired-dialog',
  templateUrl: './token-expired-dialog.component.html',
  styleUrls: ['./token-expired-dialog.component.scss'],
})
export class TokenExpiredDialogComponent {
  isDialogVisible = false;

  constructor(
    private tokenExpiredDialogService: TokenExpiredDialogService,
    private languageService: ChangeLanguageService,
    private router: Router,
  ) {
    this.tokenExpiredDialogService.isTokenExpiredDialogOpen$.subscribe({
      next: (value) => { this.isDialogVisible = value; },
    });
  }

  logOut() {
    this.tokenExpiredDialogService.closeTokenExpiredDialog();
  }

  redirectToLogin() {
    this.logOut();
  }

  redirectToWelcomePage() {
    this.logOut();
    this.router.navigate(['/']);
  }
}
