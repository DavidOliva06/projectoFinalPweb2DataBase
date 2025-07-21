// Archivo: src/app/pages/fixture/fixture-list.spec.ts
// ESTADO: CORREGIDO Y ESTANDARIZADO.

import { ComponentFixture, TestBed } from '@angular/core/testing';

// <-- CORRECCIÓN: Importar la clase con el nombre nuevo: 'FixtureListComponent'.
import { FixtureListComponent } from './fixture-list';

// <-- CORRECCIÓN: Apuntar a la nueva clase.
describe('FixtureListComponent', () => {
  // <-- CORRECCIÓN: Actualizar los tipos.
  let component: FixtureListComponent;
  let fixture: ComponentFixture<FixtureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // <-- CORRECCIÓN: Importar la nueva clase.
      imports: [FixtureListComponent]
    })
    .compileComponents();

    // <-- CORRECCIÓN: Crear el componente con la nueva clase.
    fixture = TestBed.createComponent(FixtureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
