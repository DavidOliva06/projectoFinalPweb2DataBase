import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class Team {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string 
  ) { }
  
  getTeamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}teams/${id}/`);
  }
}
