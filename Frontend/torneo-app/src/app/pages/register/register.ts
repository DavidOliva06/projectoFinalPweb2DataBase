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
  }
}
  
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
      // Éxito: muestra un mensaje y redirige al login después de un momento
      this.isLoading = false;
      this.successMessage = '¡Registro exitoso! Serás redirigido al login...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000); // Espera 3 segundos antes de redirigir
    },
    error: (err) => {
      // Error: muestra un mensaje al usuario
      this.isLoading = false;
      // Lógica simple para mostrar errores (se podría mejorar)
      if (err.error && err.error.email) {
        this.errorMessage = `Error con el correo: ${err.error.email[0]}`;
      } else {
        this.errorMessage = 'Ocurrió un error en el registro. Por favor, inténtalo de nuevo.';
      }
      console.error('Error en el registro:', err);
    }
  });
}