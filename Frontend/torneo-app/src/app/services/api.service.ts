// Archivo: src/app/services/api.service.ts
// ESTADO: CORREGIDO.

import { Injectable } from '@angular/core';
// <-- CORRECCIÓN: Usamos la ruta correcta desde la raíz de la aplicación 'src'.
// Esta ruta no se romperá si mueves el archivo de servicio de lugar.
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor() { }

  public getApiUrl(): string {
    return this.baseUrl;
  }
}