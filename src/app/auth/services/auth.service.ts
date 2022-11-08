import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  SignInDTO,
  SignInResponse,
  SignUpDTO,
  SignUpResponse,
  StorageKeys,
  Routes,
} from '../models/project-manager.model';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthorized$$ = new BehaviorSubject(false);

  public isAuthorized$ = this.isAuthorized$$.asObservable();

  redirectUrl: string | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
  ) { }

  signUp(newUser: SignUpDTO) {
    const login$: Observable<SignUpResponse> = this.http.post<SignUpResponse>(`${Routes.SignUp}`, newUser);
    login$.subscribe({
      next: () => {
        const user: SignInDTO = { login: newUser.login, password: newUser.password };
        this.signIn(user);
      },
      error: () => this.isAuthorized$$.next(false),
    });
    return login$;
  }

  signIn(user: SignInDTO) {
    const login$: Observable<SignInResponse> = this.http.post<SignInResponse>(`${Routes.SignIn}`, user);
    login$.subscribe({
      next: (result) => {
        this.isAuthorized$$.next(true);
        this.localStorageService.setInLocalStorage(StorageKeys.Token, result.token);
        this.router.navigateByUrl('workspace');
      },
      error: () => this.isAuthorized$$.next(false),
    });
    return login$;
  }

  logout() {
    this.isAuthorized$$.next(false);
  }

  isAuthorized() {
    return this.isAuthorized$$.value;
  }
}