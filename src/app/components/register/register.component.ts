import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name: string;
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  onSubmit() {
    this.authService.registerUser(this.name, this.email, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert(`Error: ${err.error.message}`);
        }
      });
  }
}
