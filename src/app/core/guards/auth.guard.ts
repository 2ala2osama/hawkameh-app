import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieStorageService } from '../../shared/services/cookies.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cookies = inject(CookieStorageService);

  
  const token = cookies.getItem('access-token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
