// Archivo: src/app/pages/register/register.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // <-- CORRECCIÓN: Nombre de clase estandarizado.

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
// <-- CORRECCIÓN: Se renombra la clase a 'RegisterComponent'.
export class RegisterComponent { 

  userData = {
    name: '',
    email: '',
    password: ''
  };

  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService, // <-- CORRECCIÓN: Inyección con nombre estandarizado.
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        // El mensaje que usas es muy bueno para la UX.
        this.successMessage = '¡Registro exitoso! Revisa tu correo para activar tu cuenta.';
        // Opcional: podrías resetear el formulario aquí.
        // this.userData = { name: '', email: '', password: '' };
      },
      error: (err: any) => {
        this.isLoading = false;
        // Tu lógica para manejar errores específicos de Django es excelente. La mantenemos.
        if (err.error?.email && Array.isArray(err.error.email)) {
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