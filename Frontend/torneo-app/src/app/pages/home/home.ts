// Archivo: src/app/pages/home/home.ts
// ESTADO: CORREGIDO Y CON LÓGICA AÑADIDA.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf, *ngFor, etc.
import { RouterLink } from '@angular/router';   // Necesario para routerLink
import { PlayerService } from '../../services/player.service'; // Asumimos que tendrás este servicio

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- CORRECCIÓN: Imports necesarios para el template
  templateUrl: './home.html',
  styleUrl: './home.css'
})
// <-- CORRECCIÓN: Renombrar a HomeComponent y añadir interfaces del ciclo de vida.
export class HomeComponent implements OnInit, OnDestroy {

  // Propiedades para el contador
  countdownDisplay: string = '00:00:00';
  private countdownInterval: any;

  // Propiedades para las últimas inscripciones
  lastPlayers: any[] = [];
  isLoadingPlayers: boolean = true;

  // <-- CORRECCIÓN: Inyectar el servicio de jugadores.
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.startCountdown();
    this.loadLastPlayers();
  }

  // Se ejecuta cuando el componente se destruye para evitar fugas de memoria.
  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  startCountdown(): void {
    // Simulación: la inscripción termina en 3 horas desde que se carga la página.
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 3);

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.countdownDisplay = "Inscripciones cerradas";
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countdownDisplay = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0');
    }, 1000);
  }

  loadLastPlayers(): void {
    this.isLoadingPlayers = true;
    // Asumimos que el servicio tiene un método para obtener los últimos 3 jugadores.
    this.playerService.getLastPlayers(3).subscribe({
      next: (data) => {
        this.lastPlayers = data;
        this.isLoadingPlayers = false;
      },
      error: (err) => {
        console.error('Error al cargar los últimos jugadores:', err);
        this.isLoadingPlayers = false;
        // Podríamos mostrar un mensaje de error si fuera necesario.
      }
    });
  }
}
