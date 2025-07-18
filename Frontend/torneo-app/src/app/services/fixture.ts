import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class Fixture {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string 
  ) { }

  getFixtures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}fixtures/`);
  }  
}
