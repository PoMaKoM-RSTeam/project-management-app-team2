import { FormControl, ValidationErrors } from '@angular/forms';

export class AuthValidator {
  static validatorsPassword(control: FormControl):ValidationErrors | null {
    const passwordLength = control.value && control.value.length > 7;
    if (!passwordLength) {
      return {
        invalidPassword: 'AUTH.MIN_LENGTH_PASSWORD',
      };
    } if ((!(/[A-ZА-Я]/.test(control.value)))) {
      return {
        invalidPassword: 'AUTH.PASSWORD_UPPERCASE',
      };
    }
    if ((!(/[a-zа-я]/.test(control.value)))) {
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
}
