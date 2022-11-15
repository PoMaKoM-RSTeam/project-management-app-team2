import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SignUpResponse } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})

export class GetUsersServices {
  private storageUsers$$ = new BehaviorSubject<SignUpResponse[]>([]);

  storageUsers$ = this.storageUsers$$.asObservable();

  getUsers(users: SignUpResponse[]) {
    this.storageUsers$$.next(users);
  }
}
