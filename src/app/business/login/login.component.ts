import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpAuthResult } from '../../interfaces/types';
import { Router } from '@angular/router';
import { SweetAlert2Module  } from '@sweetalert2/ngx-sweetalert2'
import Swal from 'sweetalert2'

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
    MatError,
    SweetAlert2Module
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  success: number = 0;
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        (result: HttpAuthResult) => {
          if (result.success) {
            // Save the token and username to localStorage
            localStorage.setItem('token', result.token);
            localStorage.setItem('username', result.user.name);
            this.router.navigate(['/people']);
            this.success = 2;

            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Credenciales correctas."
            });

          } else {
            this.message = result.message || '';
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "error",
              title: result.message
            });
          }
        },
        (error) => {
          //console.error('Login error', error);
          // Maneja el error de la solicitud HTTP
        }
      );
    }
  }
}
