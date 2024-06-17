import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

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
          this.connectedSource.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('connected');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.connectedSource.next(false);
  }
}
