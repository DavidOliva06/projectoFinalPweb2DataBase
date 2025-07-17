import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  credentials = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        console.log('Login exitoso!');
        this.router.navigate(['/fixture']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        console.error('Error en el login:', err);
      }
    });
  }
}