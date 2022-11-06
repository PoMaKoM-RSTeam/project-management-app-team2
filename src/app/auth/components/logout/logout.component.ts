import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  loginStorage: string | null = null;

  constructor(private loginService: LoginService, private rout: Router) {}

  ngOnInit() {
    this.loginService.auth.subscribe((e:string) => {
      this.loginStorage = e;
      return this.loginStorage;
    });
  }

  logout() {
    localStorage.removeItem('login');
    this.rout.navigate(['/auth/login']);
  }
}
