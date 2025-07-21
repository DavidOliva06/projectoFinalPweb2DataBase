// Archivo: src/app/app.config.ts
// ESTADO: FINAL, COMPLETO Y OPTIMIZADO PARA SSR.

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// <-- CORRECCIÓN: Importa 'withFetch' para habilitar la API fetch en HttpClient.
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

// Importa las rutas principales de tu aplicación.
import { routes } from './app.routes';

// Importa el interceptor JWT desde su ubicación correcta.
import { jwtInterceptor } from './interceptors/jwt.interceptor';

/**
 * Configuración principal de la aplicación Angular.
 * Utiliza el nuevo sistema de 'providers' para aplicaciones standalone.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // 1. PROVEEDOR DE DETECCIÓN DE CAMBIOS
    // Habilita el sistema de detección de cambios tradicional y robusto de Angular
    // basado en Zone.js. Es esencial para que la mayoría de las librerías funcionen sin problemas.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 2. PROVEEDOR DE RUTAS
    // Configura el enrutador de Angular con las rutas definidas en app.routes.ts.
    provideRouter(routes),

    // 3. PROVEEDOR DE ANIMACIONES
    // Habilita el sistema de animaciones de Angular. Es un requisito para
    // que librerías como ngx-toastr funcionen correctamente.
    provideAnimations(),

    // 4. PROVEEDOR DE HTTP CLIENT CON INTERCEPTOR Y FETCH
    // Provee una instancia global de HttpClient configurada para:
    // a) Usar nuestro jwtInterceptor para añadir automáticamente el token de autenticación.
    // b) Usar la API 'fetch' moderna, lo cual es recomendado para SSR.
    provideHttpClient(
      withInterceptors([jwtInterceptor]),
      withFetch() // <-- CORRECCIÓN: Habilita el uso de fetch.
    ),

    // 5. PROVEEDOR DE NOTIFICACIONES (TOASTR)
    // Configura la librería ngx-toastr con opciones globales.
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ]
};
