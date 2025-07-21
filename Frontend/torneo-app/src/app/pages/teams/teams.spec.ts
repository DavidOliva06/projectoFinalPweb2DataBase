// Archivo: src/app/pages/teams/teams.spec.ts
// ESTADO: ACTUALIZADO Y CORREGIDO PARA EL NUEVO TEAMSCOMPONENT.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importante para probar servicios

// <-- CORRECCIÓN 1: Importamos la clase con el nombre nuevo y correcto: 'TeamsComponent'.
// La ruta ahora apunta a 'teams.ts' (o como hayas renombrado el archivo).
import { TeamsComponent } from './teams'; 

// <-- CORRECCIÓN 2: La descripción de la suite de pruebas ahora se refiere a 'TeamsComponent'.
describe('TeamsComponent', () => {
  // <-- CORRECCIÓN 3: Las variables de tipo ahora usan 'TeamsComponent'.
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // <-- CORRECCIÓN 4: El array de imports ahora usa 'TeamsComponent'.
      // También añadimos HttpClientTestingModule porque el componente depende de TeamService,
      // que a su vez depende de HttpClient. Esto evita errores de inyección.
      imports: [TeamsComponent, HttpClientTestingModule] 
    })
    .compileComponents();

    // <-- CORRECCIÓN 5: El 'createComponent' ahora instancia 'TeamsComponent'.
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
