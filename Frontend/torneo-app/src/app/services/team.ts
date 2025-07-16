import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Team {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // <-- TU URL DE DJANGO

  constructor(private http: HttpClient) { }
  
  getTeamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}teams/${id}/`);
  }
}
