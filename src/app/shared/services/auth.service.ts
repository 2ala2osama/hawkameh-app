import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpsService } from './https.service';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { signIn } from '../models/signin.model';
import { Router } from '@angular/router';
import { CookieStorageService } from './cookies.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private https: HttpsService, private router: Router, private cookiesService: CookieStorageService) { }

  login(username: string, password: string) {
    const body = { username: username, password: password };

    this.https
      .sendPostRequestAuth<{
        access_token: string;
        refresh_token?: string;
        token_type: string;
        expires_at: string;
      }>(`${this.baseUrl}login`, body)
      .subscribe({
        next: (res) => {
          this.cookiesService.setItem('access-token', res.access_token);
          this.router.navigateByUrl('/dashboard')
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
  }

  getRole(): any {
    // return this.currentUser ? this.currentUser.role : null;
  }

  isAdmin(): any {
    return 'admin';
  }

  isCEO(): any {
    return 'ceo';
  }

  isInvestor(): any {
    return 'investor';
  }


  // Retrieve token and parse JSON
  getToken(): any {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  logout() {
    this.https
      .sendPostRequestAuth(`${this.baseUrl}logout`, null, true)
      .subscribe({
        next: () => {
          this.cookiesService.removeItem('access-token');
          this.router.navigate(['/login']);
        },
        error: (err) => console.error('Logout failed:', err)
      });
  }




}
