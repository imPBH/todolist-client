import { Component } from '@angular/core';
import { Todo } from '../../types/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-admin-todos',
  templateUrl: './admin-todos.component.html',
  styleUrl: './admin-todos.component.scss'
})
export class AdminTodosComponent {
  todos: Todo[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
    this.subscribeToTodoDeletions();
  }

  loadTodos() {
    this.todoService.getAllTodos().subscribe(
      {
        next: (todos) => {
          this.todos = todos
        },
        error: (error) => {
          console.error('Failed to fetch todos:', error);
        }
      }
    );
  }

  private subscribeToTodoDeletions() {
    this.todoService.onTodoDeleted().subscribe(deletedTodoId => {
      this.todos = this.todos.filter(todo => todo.id !== deletedTodoId);
    });
  }
}
