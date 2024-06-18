import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../types/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
    this.subscribeToTodoDeletions();
  }

  loadTodos() {
    const userId = parseInt(localStorage.getItem('userId') || '', 10);
    if (!isNaN(userId)) {
      this.todoService.getTodos(userId).subscribe(
        {
          next: (todos) => {
            this.todos = todos
          },
          error: (error) => {
            console.error('Failed to fetch todos:', error);
          }
        }
      );
    } else {
      console.error('Invalid userId stored in localStorage.');
    }
  }

  private subscribeToTodoDeletions() {
    this.todoService.onTodoDeleted().subscribe(deletedTodoId => {
      this.todos = this.todos.filter(todo => todo.id !== deletedTodoId);
    });
  }

  addTodo() {
    console.log(this.newTodoTitle)
    if (this.newTodoTitle.trim() === '') {
      return;
    }

    const userId = parseInt(localStorage.getItem('userId') || '', 10);
    if (!isNaN(userId)) {
      this.todoService.createTodo(userId, this.newTodoTitle).subscribe(
        {
          next: (newTodo) => {
            console.log('Todo created successfully:', newTodo);
            this.todos.push(newTodo);
            this.newTodoTitle = '';
          },
          error: (error) => {
            console.error('Failed to create todo:', error);
          }
        }
      );
    } else {
      console.error('Invalid userId stored in localStorage.');
    }
  }
}
