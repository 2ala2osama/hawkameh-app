import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpsService } from './https.service';
import { Observable } from 'rxjs';
import { signIn } from '../models/signin.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private https: HttpsService, private router: Router) {}

  login(body: signIn): Observable<string> {
    return this.https.sendPostRequest(
      `${this.baseUrl}/getToken`,
      body,
      true,
      'text' // ✅ specify text response
    );
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

  setToken(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  // Retrieve token and parse JSON
  getToken(): any {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
