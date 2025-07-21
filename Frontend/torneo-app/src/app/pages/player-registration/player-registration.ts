// Archivo: src/app/pages/player-registration/player-registration.component.ts
// ESTADO: CORREGIDO PARA SATISFACER EL TIPADO DE TYPESCRIPT.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { PlayerService } from '../../services/player.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player-registration.html',
})
export class PlayerRegistrationComponent implements OnInit {
  
  playerData: {
    name: string;
    age: number | null;
    email: string;
    team_id: number | null;
  } = {
    name: '',
    age: null,
    email: '',
    team_id: null
  };

  teams: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe({
      next: (data: any) => this.teams = data,
      error: () => this.errorMessage = 'No se pudieron cargar los equipos para la inscripción.'
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.playerService.createPlayer(this.playerData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('¡Jugador registrado con éxito!', 'Enhorabuena');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading = false;
        
        // Esta lógica para determinar el mensaje de error ya es excelente.
        const errorMsg = err.error?.[0] || err.error?.detail || 'Ocurrió un error al registrar el jugador.';
        this.errorMessage = errorMsg;

        // --- CORRECCIÓN ---
        // Pasamos la variable 'errorMsg' directamente a toastr.
        // Como 'errorMsg' es garantizado ser un 'string', el compilador estará satisfecho.
        this.toastr.error(errorMsg, 'Error');

        console.error('Error en registro de jugador:', err);
      }
    });
  }
}
