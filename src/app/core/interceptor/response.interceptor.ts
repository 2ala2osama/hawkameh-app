import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const responseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // ✅ Successful response handling
        console.log('✅ Response:', event);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('❌ Error Response:', error);

      if (error.status === 401) {
        // Token expired → redirect to login
        localStorage.removeItem('access_token');
        router.navigate(['/login']);
      }

      if (error.status === 403) {
        alert('You do not have permission to access this resource.');
      }

      if (error.status >= 500) {
        alert('Server error. Please try again later.');
      }

      return throwError(() => error);
    })
  );
};
