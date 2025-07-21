// Archivo: src/app/layouts/main-layout/main-layout.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { ComponentFixture, TestBed } from '@angular/core/testing';

// <-- CORRECCIÓN 1: Importamos la clase con el nombre nuevo: 'MainLayoutComponent'.
import { MainLayoutComponent } from './main-layout';

// <-- CORRECCIÓN 2: El 'describe' ahora apunta al nombre de clase correcto.
describe('MainLayoutComponent', () => { 
  // <-- CORRECCIÓN 3: Las variables de tipo ahora usan el nombre de clase correcto.
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // <-- CORRECCIÓN 4: El array de imports ahora usa el nombre de clase correcto.
      imports: [MainLayoutComponent]
    })
    .compileComponents();

    // <-- CORRECCIÓN 5: El 'createComponent' ahora usa el nombre de clase correcto.
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
