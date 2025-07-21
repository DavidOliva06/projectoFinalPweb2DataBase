// Archivo: src/app/app.routes.ts
// ESTADO: FINAL Y CORREGIDO.

import { Routes } from '@angular/router';

// --- Importaciones de Componentes y Guardias ---

// 1. Layout Principal
import { MainLayoutComponent } from './layouts/main-layout/main-layout';

// 2. Páginas Públicas
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

// 3. Páginas Protegidas (Requieren Login)
import { FixtureListComponent } from './pages/fixture-list/fixture-list';
import { TeamsComponent } from './pages/teams/teams'; // <-- CORRECCIÓN: Usamos el nuevo componente unificado.
import { PlayerRegistrationComponent } from './pages/player-registration/player-registration';
// 4. Guardia de Autenticación
import { authGuard } from './guards/auth.guard';

/**
 * Define las rutas principales de la aplicación.
 * Todas las rutas están anidadas dentro del MainLayoutComponent para mantener
 * una cabecera y pie de página consistentes.
 */
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // --- Rutas Públicas ---
      { path: '', component: HomeComponent }, // Ruta raíz (página de inicio)
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegisterComponent },
      
      // --- Rutas Protegidas ---
      // Solo accesibles si el authGuard devuelve 'true'.
      { 
        path: 'fixture', 
        component: FixtureListComponent, 
        canActivate: [authGuard] 
      },
      { 
        path: 'teams', // <-- CORRECCIÓN: Ruta simplificada para la página de equipos.
        component: TeamsComponent, 
        canActivate: [authGuard] 
      },
      { 
        path: 'registrar-jugador', component: PlayerRegistrationComponent, canActivate: [authGuard]
       },

    ]
  },

  // --- Ruta Wildcard ---
  // Redirige cualquier URL no encontrada a la página de inicio.
  // Debe ser siempre la última ruta de la lista.
  { path: '**', redirectTo: '' }
];