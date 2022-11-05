import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators,
} from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, this.validatorsPassword]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required, Validators.minLength(6)]],
      agree: [false],
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
    /** wait for refresh value */
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
        invalidPassword: 'The password must be at least 8 characters long!',
      };
    } if ((!(/[A-Z]/.test(control.value)))) {
      return {
        invalidPassword: 'The password must contain uppercase letters!',
      };
    }
    if ((!(/[a-z]/.test(control.value)))) {
      return {
        invalidPassword: 'The password must contain lowercase letters!',
      };
    }

    if ((!(/[0-9]/.test(control.value)))) {
      return {
        invalidPassword: 'The password must contain numbers!',
      };
    }

    if ((!(/[!/@,/\]e#?$g%^&.*]/.test(control.value)))) {
      return {
        invalidPassword: 'The password must contain characters: e.g., ! @ # ? ]!',
      };
    }
    return null;
  }
}
