import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HTTPService } from '../../services/http.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  isAuth: boolean = false;

  userName: string = '';

  userId: string = '';

  constructor(
    private authService: AuthService,
    private httpService: HTTPService,
  ) { }

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
    this.authService.userName$.subscribe((userName) => {
      this.userName = userName;
    });
    this.authService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  deleteUser = (): void => {
    this.httpService.deleteUser(this.userId).subscribe({
      next: () => this.logout(),
    });
  };
}
