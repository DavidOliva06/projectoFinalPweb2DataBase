import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register { 

  userData = {
    name: '',
    email: '',
    password: ''
  };

  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.auth.register(this.userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = '¡Registro exitoso! Serás redirigido al login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.error && err.error.email && Array.isArray(err.error.email)) {
          this.errorMessage = `Error: ${err.error.email[0]}`;
        } else if (err.error && typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Ocurrió un error en el registro. Por favor, inténtalo de nuevo.';
        }
        console.error('Error en el registro:', err);
      }
    });
  }
}