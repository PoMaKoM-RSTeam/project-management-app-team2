import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
  private authSubject = new BehaviorSubject<any>('');

  // constructor ( a)

  auth = this.authSubject.asObservable();

  getDateAuth(data: any) {
    localStorage.setItem('login', data);
    this.authSubject.next(data);
  }
}
