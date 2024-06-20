import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static idCounter = 0;
  private currentUser: any = null;

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const storedCounter = localStorage.getItem('idCounter');
      if (storedCounter) {
        AuthService.idCounter = +storedCounter;
      }

      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
  }

  private generateId(): number {
    AuthService.idCounter += 1;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('idCounter', AuthService.idCounter.toString());
    }
    return AuthService.idCounter;
  }

  saveUserData(userData: any) {
    const id = this.generateId();
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const dataWithId = { id, ...userData, password: hashedPassword };
    let users = this.getAllUsers();
    users.push(dataWithId);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  getUserByEmailAndPassword(email: string, password: string) {
    const users = this.getAllUsers();
    const user = users.find((user: { email: string; password: string; }) => user.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  getAllUsers() {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem('users');
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  clearUserData() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('users');
      localStorage.removeItem('idCounter');
      localStorage.removeItem('currentUser');
      this.currentUser = null;
    }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
