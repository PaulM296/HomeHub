import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { SnackbarService } from '../../services/snackbar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  onSubmit() {
    const user = { firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password };
    this.accountService.register(user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.snackbarService.success('Registration successful! You can now log in.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.snackbarService.error('Registration failed. Please try again.');
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}
