// Archivo: src/app/services/api.service.spec.ts
// ESTADO: CORRECTO Y SIMPLIFICADO.

import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment'; // Importamos el entorno para probar

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // NUEVA PRUEBA: Verifica que el método getApiUrl() devuelva el valor correcto.
  it('should return the API URL from the environment', () => {
    // Llama al método que queremos probar
    const apiUrl = service.getApiUrl();

    // Compara el resultado con el valor esperado del archivo de entorno
    expect(apiUrl).toBe(environment.apiUrl);
  });

  // --- PRUEBAS ELIMINADAS ---
  // Las pruebas para 'getHeaders()' han sido eliminadas porque ese método
  // ya no es responsabilidad de este servicio. La lógica de las cabeceras
  // ahora reside en el 'jwt.interceptor.ts'.
});
