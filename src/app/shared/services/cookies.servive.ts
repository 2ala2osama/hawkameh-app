// src/app/shared/services/cookie.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CookieService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  set(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    this.document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  get(name: string): string | null {
    return this.document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1] || null;
  }

  delete(name: string) {
    this.set(name, '', -1);
  }

  
}
