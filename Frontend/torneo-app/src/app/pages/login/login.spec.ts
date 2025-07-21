// Archivo: src/app/pages/login/login.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { ComponentFixture, TestBed } from '@angular/core/testing';

// <-- CORRECCIÓN 1: Importamos la clase con el nombre nuevo: 'LoginComponent'.
import { LoginComponent } from './login';

// <-- CORRECCIÓN 2: El 'describe' ahora apunta al nombre de clase correcto.
describe('LoginComponent', () => {
  // <-- CORRECCIÓN 3: Las variables de tipo ahora usan el nombre de clase correcto.
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // <-- CORRECCIÓN 4: El array de imports ahora usa el nombre de clase correcto.
      imports: [LoginComponent]
    })
    .compileComponents();

    // <-- CORRECCIÓN 5: El 'createComponent' ahora usa el nombre de clase correcto.
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
