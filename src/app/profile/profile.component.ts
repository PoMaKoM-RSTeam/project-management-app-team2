import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';
import { AuthService } from '../auth/services/auth.service';
import { AuthValidator } from '../auth/validators/auth-validator';
import { HTTPService } from '../core/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId: string = '';

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
    private httpService: HTTPService,
  ) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));
    this.authService.userId$.subscribe((id) => { this.userId = id; });

    this.validateForm = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.minLength(1),
      ]],
      login: [null, [
        Validators.required,
        Validators.minLength(6),
      ]],
      password: [null, [
        Validators.required,
        AuthValidator.validatorsPassword,
      ]],
      checkPassword: [null, [
        Validators.required,
        this.confirmationValidator,
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

  editUser = () => {
    const userData = {
      name: this.validateForm.value.name,
      login: this.validateForm.value.login,
      password: this.validateForm.value.password,
    };

    return this.httpService.editUser(this.userId, userData).subscribe({
      next: () => {
        this.authService.setNewLogin(userData.name, userData.login);
        this.rout.navigate(['/workspace']);
      },
    });
  };
}
