import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user).pipe(
      tap(this.setToken)
    );
  }

  private setToken(response): void {
    if (response) {
      const expireDate = new Date(new Date().getTime() + parseInt(response.expiresIn, 10) * 1000);
      localStorage.setItem('firebaseTokenExp', expireDate.toString());
      localStorage.setItem('firebaseToken', response.idToken);
    } else {
      localStorage.removeItem('firebaseTokenExp');
      localStorage.removeItem('firebaseToken');
    }
  }

  get token(): any {
    const  expDate = new Date(localStorage.getItem('firebaseTokenExp'));

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('firebaseToken');
  }

  logout(): void {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }
}
