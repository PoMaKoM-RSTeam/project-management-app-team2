import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder, UntypedFormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login-service';
import { AuthValidator } from '../../validators/auth-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  isLogin: string | null = localStorage.getItem('login');

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private rout: Router,
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.validateForm = this.fb.group({
      login: [null, [
        Validators.required,
        Validators.minLength(6),
      ]],
      password: [null, [
        Validators.required,
        AuthValidator.validatorsPassword,
      ]],
    });
  }

  login() {
    // console.log(this.validateForm.value);
    this.authService.signIn(this.validateForm.value);
    // this.loginService.getDateAuth(this.validateForm.value.userName);
    this.rout.navigate(['']);
  }
}
