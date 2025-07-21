// Archivo: src/app/interceptors/jwt.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const apiService = inject(ApiService);
  
  const accessToken = authService.getAccessToken();
  const isApiUrl = req.url.startsWith(apiService.getApiUrl());

  if (accessToken && isApiUrl) {
    const clonedReq = req.clone({
      setHeaders: {
        // --- CORRECCIÓN CLAVE ---
        // Cambiamos 'Token' por 'Bearer' para que coincida con lo que espera simple-jwt.
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};