import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Todo } from '../types/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api';
  private todoDeletedSubject = new Subject<number>();

  constructor(private http: HttpClient) {}

  getTodos(userId: number): Observable<Todo[]> {
    const url = `${this.apiUrl}/users/${userId}/todos`;
    const headers = this.getHeaders();

    return this.http.get<Todo[]>(url, { headers });
  }

  updateTodoStatus(todoId: number, done: boolean): Observable<Todo> {
    const url = `${this.apiUrl}/todos/${todoId}`;
    const headers = this.getHeaders();
    const body = { done };

    const req = this.http.patch<Todo>(url, body, { headers });
    console.log(req)
    return req
  }

  updateTodoTitle(todoId: number, title: string): Observable<Todo> {
    const url = `${this.apiUrl}/todos/${todoId}`;
    const headers = this.getHeaders();
    const body = { title };

    return this.http.patch<Todo>(url, body, { headers });
  }

  deleteTodo(todoId: number): Observable<void> {
    const url = `${this.apiUrl}/todos/${todoId}`;
    const headers = this.getHeaders();

    return this.http.delete<void>(url, { headers }).pipe(
      tap(() => {
        this.todoDeletedSubject.next(todoId);
      })
    );
  }

  onTodoDeleted(): Observable<number> {
    return this.todoDeletedSubject.asObservable();
  }

  createTodo(userId: number, title: string): Observable<Todo> {
    const url = `${this.apiUrl}/todos`;
    const headers = this.getHeaders();
    const body = { ownerId: userId, title };

    return this.http.post<Todo>(url, body, { headers });
  }

  getAllTodos(): Observable<Todo[]> {
    const url = `${this.apiUrl}/todos`;
    const headers = this.getHeaders();

    return this.http.get<Todo[]>(url, { headers });
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
