// Archivo: src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) {
    this.apiUrl = this.apiService.getApiUrl();
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token/`, credentials).pipe(
      tap((tokens: any) => {
        this.setTokens(tokens.access, tokens.refresh);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register/`, userData);
  }

  logout(): void {
    console.log("AuthService: Ejecutando logout y limpiando tokens."); // <-- Útil para depurar
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  private hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return false;
    }
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const isExpired = decodedToken.exp < (Date.now() / 1000);
      return !isExpired;
    } catch (error) {
      console.error("Token malformado o inválido:", error);
      return false;
    }
  }
}
