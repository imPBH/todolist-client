import { LoginResponse } from './../types/LoginResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private connectedSource = new BehaviorSubject<boolean>(this.checkInitialConnection());
  isConnected$ = this.connectedSource.asObservable();
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  private checkInitialConnection(): boolean {
    return localStorage.getItem('connected') === 'true';
  }

  registerUser(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/auth/register`, body);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('connected', 'true');
          localStorage.setItem('username', response.user.name);
          localStorage.setItem('userId', response.user.id.toString());
          localStorage.setItem('role', response.user.role);
          this.connectedSource.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('connected');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.connectedSource.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('connected');
  }
}
