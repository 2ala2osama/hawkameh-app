// src/app/shared/services/keycloak.service.ts
import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { CookieService } from './cookies.servive';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak!: KeycloakInstance;

  constructor(private cookie: CookieService) {}

  init(): Promise<boolean> {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9292', // ✅ Keycloak server
      realm: 'my-realm',
      clientId: 'hawkama-app',
    });

    return this.keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      if (authenticated) {
        this.setToken(this.keycloak.token!);
      }
      return authenticated;
    });
  }
private _token: string | null = null;

setToken(token: string) {
  this._token = token;
  if (typeof document !== 'undefined') {
    this.cookie.set('auth_token', token);
  }
}

getToken(): string | null {
  return this._token ?? (typeof document !== 'undefined' ? this.cookie.get('auth_token') : null);
}

  login() {
    this.keycloak.login();
  }

  logout() {
    this.cookie.delete('auth_token');
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
