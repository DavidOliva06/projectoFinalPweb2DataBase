// src/app/services/team.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
// Opcional: Crear una interfaz en un archivo 'team.model.ts' para tipado fuerte.

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this.apiUrl = this.apiService.getApiUrl();
  }

  /**
   * Obtiene la lista completa de equipos desde el backend.
   */
  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teams/`);
  }

  /**
   * Obtiene los detalles de un solo equipo por su ID.
   * (Este método lo usará tu TeamDetailComponent)
   */
  getTeamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teams/${id}/`);
  }
}
