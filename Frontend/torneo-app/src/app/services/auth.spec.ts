// Archivo: src/app/services/auth.service.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- Para simular peticiones HTTP.
import { AuthService } from './auth.service'; // <-- CORRECCIÓN: Importar la clase estandarizada.
import { ApiService } from './api.service'; // <-- CORRECCIÓN: Necesitamos proveer un mock para esta dependencia.

// <-- CORRECCIÓN: Apuntar a la nueva clase.
describe('AuthService', () => {
  // <-- CORRECCIÓN: Actualizar el tipo de la variable.
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // CORRECCIÓN: Importar HttpClientTestingModule para simular el HttpClient
      // y proveer un mock simple para ApiService.
      imports: [HttpClientTestingModule],
      providers: [ApiService] 
    });
    // <-- CORRECCIÓN: Inyectar el servicio estandarizado.
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
