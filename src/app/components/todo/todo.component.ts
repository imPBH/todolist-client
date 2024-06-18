import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../types/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Input() todo!: Todo;
  editingTitle = false;
  newTitle = '';

  constructor(private todoService: TodoService) {}

  toggleDone() {
    this.todoService.updateTodoStatus(this.todo.id, !this.todo.done)
      .subscribe(
        (response) => {
          console.log('Todo status updated successfully:', response);
          this.todo.done = !this.todo.done
        },
        (error) => {
          console.error('Failed to update todo status:', error);
        }
      );
  }

  editTodo() {
    this.newTitle = this.todo.title;
    this.editingTitle = true;
  }

  cancelEditTitle() {
    this.editingTitle = false;
  }

  saveTitle() {
    this.todoService.updateTodoTitle(this.todo.id, this.newTitle)
      .subscribe(
        (response) => {
          console.log('Todo title updated successfully:', response);
          this.todo.title = this.newTitle;
          this.editingTitle = false;
        },
        (error) => {
          console.error('Failed to update todo title:', error);
        }
      );
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todo.id)
      .subscribe(
        () => {
          console.log('Todo deleted successfully:', this.todo.id);
        },
        (error) => {
          console.error('Failed to delete todo:', error);
        }
      );
  }
}
