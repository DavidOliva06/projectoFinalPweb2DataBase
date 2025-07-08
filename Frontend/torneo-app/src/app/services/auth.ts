import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    // Usamos el endpoint que configuramos en Django con Simple JWT
    return this.http.post(`${this.apiUrl}token/`, credentials).pipe(
      tap((tokens: any) => {
        // Si el login es exitoso, guardamos los tokens en el almacenamiento local del navegador.
        this.setTokens(tokens.access, tokens.refresh);
        console.log('Tokens guardados exitosamente!');
      })
    );
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, userData);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  } 
}
