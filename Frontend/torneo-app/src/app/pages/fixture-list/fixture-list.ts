// Archivo: src/app/pages/fixture/fixture-list.ts
// ESTADO: CORREGIDO Y MEJORADO.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- CORRECCIÓN: Importar para usar ngModel
import { RouterLink } from '@angular/router';
import { FixtureService } from '../../services/fixture.service'; // <-- CORRECCIÓN: Usar el nombre de clase estandarizado.

@Component({
  selector: 'app-fixture-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // <-- CORRECCIÓN: Añadir FormsModule
  templateUrl: './fixture-list.html',
  styleUrl: './fixture-list.css'
})
// <-- CORRECCIÓN: Renombrar a FixtureListComponent.
export class FixtureListComponent implements OnInit {

  fixtures: any[] = [];
  isLoading = false; // <-- CORRECCIÓN: Inicia en false, se activa solo al cargar.
  errorMessage: string | null = null;

  // NUEVO: Propiedades para manejar rondas y el selector
  rounds: number[] = Array.from({length: 10}, (_, i) => i + 1); // Genera un array de 1 a 10 para las rondas
  selectedRound: number | null = null;

  // <-- CORRECCIÓN: Inyectar el servicio con el nombre de clase estandarizado.
  constructor(private fixtureService: FixtureService) {}

  ngOnInit(): void {
    // No cargamos nada al inicio, esperamos a que el usuario seleccione una ronda.
  }
  
  // NUEVO: Método que se llama cuando el usuario cambia la selección de ronda.
  onRoundChange(): void {
    if (this.selectedRound) {
      this.loadFixturesByRound(this.selectedRound);
    }
  }

  loadFixturesByRound(round: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.fixtures = []; // Limpia los partidos anteriores

    this.fixtureService.getFixturesByRound(round).subscribe({
      next: (data) => {
        this.fixtures = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = `No se pudieron cargar los partidos de la ronda ${round}. Puede que aún no se haya generado.`;
        this.isLoading = false;
        console.error(`Error al cargar la ronda ${round}:`, err);
      }
    });
  }

  // NUEVO: Método para descargar el PDF de la ronda seleccionada.
  downloadFixturePDF(): void {
    if (!this.selectedRound) return;

    this.fixtureService.getFixturePdf(this.selectedRound).subscribe({
      next: (blob) => {
        // Crea una URL para el blob (el contenido del PDF)
        const url = window.URL.createObjectURL(blob);
        // Crea un enlace temporal para iniciar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = `fixture_ronda_${this.selectedRound}.pdf`; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
        // Limpieza
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      error: (err) => {
        this.errorMessage = `No se pudo descargar el PDF de la ronda ${this.selectedRound}.`;
        console.error('Error al descargar el PDF:', err);
      }
    });
  }
}
