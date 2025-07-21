// Archivo: src/app/pages/login/login.component.ts

import { Component, OnInit } from '@angular/core'; // <-- Importa OnInit
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
// <-- CORRECCIÓN: Implementa la interfaz OnInit
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage: string | null = null; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  /**
   * ngOnInit se ejecuta cuando el componente se carga.
   * Es el lugar perfecto para realizar acciones de inicialización.
   */
  ngOnInit(): void {
    // --- CORRECCIÓN CLAVE ---
    // Si el usuario llega a la página de login, es una buena práctica
    // asegurarse de que cualquier sesión anterior (posiblemente con un token expirado)
    // sea completamente destruida antes de intentar un nuevo inicio de sesión.
    this.authService.logout();
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        // La lógica para guardar el token ya está en el servicio (authService.login),
        // por lo que no necesitamos hacer nada con 'response' aquí.
        this.toastr.success('Has iniciado sesión correctamente.', '¡Bienvenido!');
        this.router.navigate(['/fixture']);
      },
      error: (err) => {
        this.isLoading = false;
        // La lógica para mostrar el error ya es correcta.
        this.errorMessage = 'El correo electrónico o la contraseña son incorrectos.'; 
        this.toastr.error(this.errorMessage, 'Error de Autenticación');
        console.error('Error en el login:', err);
      }
    });
  }
}