import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
    const user = { firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password };
    this.accountService.register(user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }
}
