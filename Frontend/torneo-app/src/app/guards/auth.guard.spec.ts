// Archivo: src/app/guards/auth.guard.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Routes } from '@angular/router';

// <-- CORRECCIÓN 1: Importamos el guardia desde el archivo correcto.
import { authGuard } from './auth.guard';
import { FixtureListComponent } from '../pages/fixture-list/fixture-list';
import { RegisterComponent } from '../pages/register/register';
import { LoginComponent } from '../pages/login/login';
import { HomeComponent } from '../pages/home/home';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout';
import { TeamsComponent } from '../pages/teams/teams';

// <-- CORRECCIÓN 2: Actualizamos la descripción para reflejar su propósito.
describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Aquí podríamos proveer Mocks de Router y AuthService si quisiéramos hacer pruebas más complejas.
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegisterComponent },
      // --- RUTA PROTEGIDA ---
      { 
        path: 'fixture', 
        component: FixtureListComponent,
        canActivate: [authGuard] // <-- ASÍ SE APLICA EL GUARDIA
      },
      // Otra ruta protegida
      { 
        path: 'equipo/:id', 
        component: TeamsComponent,
        canActivate: [authGuard] // El mismo guardia puede proteger múltiples rutas
      },
    ]
  },
  // ...
];
