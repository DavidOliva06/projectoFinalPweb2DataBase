import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngIf, *ngFor, etc.
import { Fixture } from '../../services/fixture';

@Component({
  selector: 'app-fixture-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixture-list.html',
  styleUrl: './fixture-list.css'
})
export class FixtureList implements OnInit {

  fixtures: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private fixtureService: Fixture) {}

  ngOnInit(): void {
    this.loadFixtures();
  }

  loadFixtures(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.fixtureService.getFixtures().subscribe({
      next: (data) => {
        this.fixtures = data;
        this.isLoading = false;
        console.log('Fixtures cargados:', this.fixtures);
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar los partidos. Por favor, inténtalo más tarde.';
        this.isLoading = false;
        console.error('Error al cargar fixtures:', err);
      }
    });
  }
}
