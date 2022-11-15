import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { AuthService } from '../../services/auth.service';
import { AuthValidator } from '../../validators/auth-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',

  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  constructor(
    private fb: UntypedFormBuilder,
    private rout:Router,
    public translate: TranslateService,
    private languageService: ChangeLanguageService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.validateForm = this.fb.group({
      email: [null, [
        Validators.required,
        Validators.email,
      ]],
      password: [null, [
        Validators.required,
        AuthValidator.validatorsPassword,
      ]],
      checkPassword: [null, [
        Validators.required,
        this.confirmationValidator,
      ]],
      login: [null, [
        Validators.required,
        Validators.minLength(6),
      ]],
      name: [null, [
        Validators.required,
        Validators.minLength(1),
      ]],
    });
  }

  submitForm(): void {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // eslint-disable-next-line class-methods-use-this
  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  registration() {
    const userData = {
      name: this.validateForm.value.name,
      login: this.validateForm.value.login,
      password: this.validateForm.value.password,
    };

    this.authService.signUp(userData);
    this.rout.navigate(['/auth/login']);
  }
}
