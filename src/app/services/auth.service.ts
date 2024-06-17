import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private connectedSource = new BehaviorSubject<boolean>(this.checkInitialConnection());
  isConnected$ = this.connectedSource.asObservable();

  constructor() {}

  private checkInitialConnection(): boolean {
    return localStorage.getItem('connected') === 'true';
  }

  login(username: string) {
    localStorage.setItem('connected', 'true');
    localStorage.setItem('username', username);
    this.connectedSource.next(true);
  }

  logout() {
    localStorage.removeItem('connected');
    this.connectedSource.next(false);
  }
}
