import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  updateUserName(userId: number, newName: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    const body = { name: newName };
    const headers = this.getHeaders();
    localStorage.setItem('username', newName);

    return this.http.patch(url, body, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
    } else {
      throw new Error('No token found in localStorage.');
    }
  }
}
