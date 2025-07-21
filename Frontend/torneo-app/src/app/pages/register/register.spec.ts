// Archivo: src/app/pages/register/register.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { ComponentFixture, TestBed } from '@angular/core/testing';

// <-- CORRECCIÓN 1: Importamos la clase con el nombre nuevo: 'RegisterComponent'.
import { RegisterComponent } from './register';

// <-- CORRECCIÓN 2: El 'describe' ahora apunta al nombre de clase correcto.
describe('RegisterComponent', () => {
  // <-- CORRECCIÓN 3: Las variables de tipo ahora usan el nombre de clase correcto.
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // <-- CORRECCIÓN 4: El array de imports ahora usa el nombre de clase correcto.
      imports: [RegisterComponent]
    })
    .compileComponents();

    // <-- CORRECCIÓN 5: El 'createComponent' ahora usa el nombre de clase correcto.
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
