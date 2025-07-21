// Archivo: src/app/services/fixture.service.ts
// ESTADO: COMPLETO Y CORREGIDO.

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Fixture } from '../models/fixture.model'; // Asegúrate de que este archivo exista

@Injectable({
  providedIn: 'root'
})
export class FixtureService {
  
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
   * Obtiene los partidos de una ronda específica desde el backend.
   * La petición final será algo como: GET /api/fixtures/?round=1
   *
   * @param round - El número de la ronda a cargar.
   * @returns Un Observable con un array de Fixtures.
   */
  getFixturesByRound(round: number): Observable<Fixture[]> {
    // HttpParams asegura que el parámetro de consulta esté correctamente codificado en la URL.
    const params = new HttpParams().set('round', round.toString());

    // El jwtInterceptor añadirá automáticamente la cabecera de autenticación si es necesario.
    return this.http.get<Fixture[]>(`${this.apiUrl}/fixtures/`, { params });
  }

  /**
   * Descarga el fixture en formato PDF para una ronda específica.
   * La petición final será: GET /api/fixture/pdf/?round=1
   *
   * @param round - El número de la ronda a descargar.
   * @returns Un Observable con el contenido del PDF como un Blob (Binary Large Object).
   */
  getFixturePdf(round: number): Observable<Blob> {
    const params = new HttpParams().set('round', round.toString());

    // Es crucial especificar `responseType: 'blob'` para que HttpClient
    // no intente interpretar la respuesta como JSON, lo que causaría un error.
    return this.http.get(`${this.apiUrl}/fixture/pdf/`, { 
      params: params, 
      responseType: 'blob' 
    });
  }
}
