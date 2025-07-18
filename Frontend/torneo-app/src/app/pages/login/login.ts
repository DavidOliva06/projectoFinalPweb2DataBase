import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

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
  // errorMessage: string | null = null;

  constructor(
    // 4. CORRECCIÓN: El tipo es 'AuthService', el nombre de la variable puede ser 'auth'
    private auth: Auth, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    this.isLoading = true;

    this.auth.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Has iniciado sesión correctamente.', '¡Bienvenido!');
        this.router.navigate(['/fixture']);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('El correo o la contraseña son incorrectos.', 'Error de Autenticación');
        console.error('Error en el login:', err);
      }
    });
  }
}