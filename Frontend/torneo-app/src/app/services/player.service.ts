import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this.apiUrl = this.apiService.getApiUrl();
  }

  // Método placeholder
  getLastPlayers(limit: number): Observable<any[]> {
    // Por ahora, devuelve un array vacío para que el componente no falle.
    return of([]);
  }
}