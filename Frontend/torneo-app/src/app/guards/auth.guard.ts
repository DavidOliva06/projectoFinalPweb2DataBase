// Archivo: src/app/guards/auth.guard.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// <-- CORRECCIÓN 1: Importamos la clase con el nombre estandarizado 'AuthService' desde el servicio.
import { AuthService } from '../services/auth.service';

/**
 * Un guardia funcional que protege las rutas que requieren autenticación.
 * Verifica si el usuario está autenticado usando el AuthService.
 * Si no lo está, redirige a la página de login y bloquea la navegación.
 *
 * @param route - La ruta activada.
 * @param state - El estado del router.
 * @returns {boolean} - True si el usuario puede acceder, false si no.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // <-- CORRECCIÓN 2: Inyectamos la dependencia usando el tipo de clase correcto 'AuthService'.
  const authService = inject(AuthService);
  const router = inject(Router);

  // <-- CORRECCIÓN 3: El método en AuthService se llamará 'isAuthenticated()' para claridad.
  if (authService.isAuthenticated()) {
    // Si el servicio dice que el usuario está autenticado, permite el acceso.
    return true;
  } else {
    // Si no, bloquea el acceso y redirige al usuario a la página de login.
    console.log('AuthGuard: Acceso denegado. Redirigiendo a /login...');
    router.navigate(['/login']);
    return false;
  }
};