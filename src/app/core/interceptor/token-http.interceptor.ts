// src/app/shared/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieStorageService } from '../../shared/services/cookies.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
const cookies = inject(CookieStorageService);

         const token=   cookies.getItem('access-token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
