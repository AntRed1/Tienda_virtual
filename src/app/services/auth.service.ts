import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'currentUser';

  constructor() {}

  login(): void {
    localStorage.setItem(this.USER_KEY, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.USER_KEY) === 'true';
  }
}
