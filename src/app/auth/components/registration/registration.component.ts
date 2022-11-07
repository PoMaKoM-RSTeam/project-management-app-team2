import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ChangeLanguageService } from 'src/app/core/services/changeLanguage.service';

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
  ) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe((value) => this.translate.use(value));

    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, this.validatorsPassword]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

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

  // eslint-disable-next-line class-methods-use-this
  validatorsPassword(control: FormControl):ValidationErrors | null {
    const passwordLength = control.value && control.value.length > 7;
    if (!passwordLength) {
      return {
        invalidPassword: 'AUTH.MINLENGTH_PASSWORD',
      };
    } if ((!(/[A-Z]/.test(control.value)))) {
      return {
        invalidPassword: 'AUTH.PASSWORD_UPPERCASE',
      };
    }
    if ((!(/[a-z]/.test(control.value)))) {
      return {
        invalidPassword: 'AUTH.PASSWORD_LOWERCASE',
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

  registration() {
    this.rout.navigate(['/auth/login']);
  }
}
