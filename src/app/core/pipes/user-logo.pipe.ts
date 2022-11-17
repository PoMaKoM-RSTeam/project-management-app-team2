import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userLogo',
})
export class UserLogoPipe implements PipeTransform {
  transform(value: string): string {
    return value.split(' ').map((el) => el[0].toUpperCase()).join('');
  }
}
