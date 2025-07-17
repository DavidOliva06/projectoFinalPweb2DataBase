import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Team } from '../../services/team';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.css'
})
export class TeamDetail implements OnInit {

  team: any = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private teamService: Team
  ) {}

  ngOnInit(): void {

    const teamId = this.route.snapshot.paramMap.get('id');

    if (teamId) {
      this.loadTeamDetails(teamId);
    } else {
      this.isLoading = false;
      this.errorMessage = "No se ha especificado un ID de equipo.";
    }
  }

  loadTeamDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.teamService.getTeamById(id).subscribe({
      next: (data) => {
        this.team = data;
        this.isLoading = false;
        console.log('Detalles del equipo:', this.team);
      },
      error: (err) => {
        this.errorMessage = `No se pudo cargar el equipo. Es posible que no exista o haya un problema de conexión.`;
        this.isLoading = false;
        console.error('Error al cargar detalles del equipo:', err);
      }
    });
  }
}