// src/app/shared/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../../shared/services/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  if (typeof window === 'undefined') return true; // SSR: allow render

  if (keycloak.isLoggedIn()) return true;

  keycloak.login();
  return false;
};
