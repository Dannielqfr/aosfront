import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpAuthResult } from '../../interfaces/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        (result: HttpAuthResult) => {
          if (result.success) {
            // Save the token and username to localStorage
            localStorage.setItem('token', result.token);
            localStorage.setItem('username', result.user.name);
            this.router.navigate(['/people']);
          } else {
            console.error('Login failed', result.message);
          }
        },
        (error) => {
          console.error('Login error', error);
          // Maneja el error de la solicitud HTTP
        }
      );
    }
  }
}
