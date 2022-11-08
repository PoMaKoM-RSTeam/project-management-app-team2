import { Component, OnInit } from '@angular/core';
import {
  FormControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { LoginService } from '../../services/login-service';

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
    private rout: Router,
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
  ) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.validateForm = this.fb.group({
      userName: [null, [
        Validators.required,
        Validators.minLength(6),
      ]],
      password: [null, [
        Validators.required,
        this.validatorsPassword]],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validatorsPassword(control: FormControl):ValidationErrors | null {
    const passwordLength = control.value && control.value.length > 7;
    if (!passwordLength) {
      return {
        invalidPassword: 'AUTH.MIN_LENGTH_PASSWORD',
      };
    } if ((!(/[A-Z]/.test(control.value)))) {
      return {
        invalidPassword: 'AUTH.PASSWORD_UPPERCASE',
      };
    }
    if ((!(/[a-z]/.test(control.value)))) {
      return {
        invalidPassword: 'AUTH.PASSWORD_LOWERCASE!',
      };
    }

    if ((!(/[0-9]/.test(control.value)))) {
      return {
        invalidPassword: 'AUTH.PASSWORD_NUMBER',
      };
    }

    if ((!(/[!/@,/\]e#?$g%^&.*]/.test(control.value)))) {
      return {
        invalidPassword: 'AUTH.PASSWORD_CHARACTERS',
      };
    }
    return null;
  }

  login() {
    this.loginService.getDateAuth(this.validateForm.value.userName);
    this.rout.navigate(['']);
  }
}
