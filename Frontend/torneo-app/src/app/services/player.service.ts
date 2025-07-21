import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
// Opcional pero recomendado: Crear una interfaz para Player en 'src/app/models/player.model.ts'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  // Guardará la URL base de la API (ej: http://127.0.0.1:8000/api)
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    // Obtenemos la URL base desde nuestro servicio centralizado.
    this.apiUrl = this.apiService.getApiUrl();
  }

  /**
   * Envía los datos de un nuevo jugador al backend para su creación.
   * La petición final será: POST /api/players/
   * El jwtInterceptor se encargará de añadir el token de autenticación.
   *
   * @param playerData - Un objeto con los datos del jugador (name, age, email, team_id).
   * @returns Un Observable con la respuesta del servidor (los datos del jugador creado).
   */
  createPlayer(playerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/players/`, playerData);
  }

  /**
   * Obtiene una lista de los últimos jugadores registrados.
   * La petición final será: GET /api/players/?limit=3&ordering=-registration_date
   *
   * @param limit - El número máximo de jugadores a devolver.
   * @returns Un Observable con un array de jugadores.
   */
  getLastPlayers(limit: number): Observable<any[]> {
    // Usamos HttpParams para construir los parámetros de la URL de forma segura.
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('ordering', '-registration_date');

    // El jwtInterceptor también protegerá esta petición.
    return this.http.get<any[]>(`${this.apiUrl}/players/`, { params });
  }
}