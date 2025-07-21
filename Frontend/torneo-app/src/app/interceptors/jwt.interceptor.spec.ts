// Archivo: src/app/interceptors/jwt.interceptor.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

// <-- CORRECCIÓN 1: Importar el interceptor con el nombre correcto desde el archivo correcto.
import { jwtInterceptor } from './jwt.interceptor';

// <-- CORRECCIÓN 2: Actualizar la descripción.
describe('jwtInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => jwtInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
