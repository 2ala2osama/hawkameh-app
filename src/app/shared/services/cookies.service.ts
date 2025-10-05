import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor() {}

  setItem(name: string, value: string, days: number = 7, path: string = '/'): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
  }

  getItem(name: string): string | null {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  removeItem(name: string, path: string = '/'): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }

  clear(): void {
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      this.removeItem(name);
    });
  }
}
