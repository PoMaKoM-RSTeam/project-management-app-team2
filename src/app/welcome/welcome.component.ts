import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  isAuth: boolean | null = null;

  constructor(private isAuthService: AuthService) {}

  ngOnInit() {
    this.isAuthService.isAuthorized$.subscribe((e) => {
      this.isAuth = e;
    });
  }
}
