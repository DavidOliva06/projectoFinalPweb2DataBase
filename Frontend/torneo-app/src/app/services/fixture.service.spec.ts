// Archivo: src/app/services/fixture.service.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FixtureService } from './fixture.service'; // <-- CORRECCIÓN: Importar la clase estandarizada.
import { ApiService } from './api.service';

// <-- CORRECCIÓN: Apuntar a la nueva clase.
describe('FixtureService', () => {
  // <-- CORRECCIÓN: Actualizar el tipo de la variable.
  let service: FixtureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService] // Proveemos ApiService ya que FixtureService depende de él.
    });
    // <-- CORRECCIÓN: Inyectar el servicio estandarizado.
    service = TestBed.inject(FixtureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
