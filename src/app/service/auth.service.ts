import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: boolean = false;
  apiKey = 'AIzaSyCGR-veuQ6kd5wpyIrya_045887ra463pY';
  registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  user!: User;

  constructor(private http: HttpClient) {}

  isAuth() {
    return this.isLogged;
  }

  createUser(
    email: string,
    id: string,
    token: string,
    expirationDate: Date
  ) {
    this.user = new User(email, id, token, expirationDate); // Assegna il nome utente all'oggetto User
    this.isLogged = true;
  }

  register(email: string, password: string) {
    return this.http.post(this.registerUrl, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  login(email: string, password: string) {
    return this.http.post(this.loginUrl, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  logout() {
    this.isLogged = false;
    localStorage.removeItem('user');
  }
}
