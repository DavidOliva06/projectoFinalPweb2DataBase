// Archivo: src/app/pages/teams/teams.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Usaremos RouterLink para la lista
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams', // Selector actualizado
  standalone: true,
  imports: [CommonModule], // RouterLink es necesario
  templateUrl: './teams.html',   // Apunta a la nueva plantilla
  styleUrl: './teams.css'
})
export class TeamsComponent implements OnInit {

  // --- NUEVO: Propiedades para la lista de equipos (el "Maestro") ---
  allTeams: any[] = [];
  isLoadingList = true;
  listErrorMessage: string | null = null;

  // --- Propiedades existentes para el detalle del equipo (el "Detalle") ---
  selectedTeam: any = null;
  isLoadingDetail = false;
  detailErrorMessage: string | null = null;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    // Al iniciar, solo cargamos la lista completa de equipos.
    this.loadAllTeams();
  }

  /**
   * Carga la lista completa de equipos desde el servicio.
   */
  loadAllTeams(): void {
    this.isLoadingList = true;
    this.listErrorMessage = null;

    this.teamService.getTeams().subscribe({
      next: (data) => {
        this.allTeams = data;
        this.isLoadingList = false;
      },
      error: (err) => {
        this.listErrorMessage = 'No se pudieron cargar los equipos.';
        this.isLoadingList = false;
        console.error('Error al cargar la lista de equipos:', err);
      }
    });
  }

  /**
   * Se activa cuando un usuario hace clic en un equipo de la lista.
   * Carga los detalles de ese equipo específico.
   * @param teamId - El ID del equipo a cargar.
   */
  selectTeam(teamId: string): void {
    this.isLoadingDetail = true;
    this.detailErrorMessage = null;
    this.selectedTeam = null; // Limpia el detalle anterior

    this.teamService.getTeamById(teamId).subscribe({
      next: (data) => {
        this.selectedTeam = data;
        this.isLoadingDetail = false;
      },
      error: (err) => {
        this.detailErrorMessage = 'No se pudo cargar el detalle del equipo.';
        this.isLoadingDetail = false;
        console.error(`Error al cargar el equipo ${teamId}:`, err);
      }
    });
  }
}