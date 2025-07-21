// Archivo: src/app/layouts/main-layout/main-layout.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importante para *ngIf
import { AuthService } from '../../services/auth.service'; // Importar el servicio

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, CommonModule], // Añadir CommonModule
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent implements OnInit {

  // Esta propiedad controlará qué botones se muestran en el HTML.
  isAuthenticated: boolean = false;

  // Inyectamos el AuthService para acceder al estado de autenticación.
  constructor(private authService: AuthService) {}

  /**
   * ngOnInit se ejecuta una vez cuando el componente se inicializa.
   * Aquí nos "sintonizamos" a la emisora de autenticación del AuthService.
   */
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }

  /**
   * Este método se llamará cuando el usuario haga clic en el botón "Cerrar Sesión".
   * Delega la lógica de cierre de sesión al AuthService.
   */
  logout(): void {
    this.authService.logout();
  }
}
