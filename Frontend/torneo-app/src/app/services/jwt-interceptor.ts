import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Auth);

  const accessToken = authService.getAccessToken();

  const isApiUrl = req.url.startsWith('http://127.0.0.1:8000/api/');

  if (accessToken && isApiUrl) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return next(clonedReq);
  }
  return next(req);
};