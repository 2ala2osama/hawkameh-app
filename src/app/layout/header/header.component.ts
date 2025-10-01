import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { KeycloakService } from '../../shared/services/keycloak.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dropdownOpen = false;
  menuItems = [
    { label: 'الرئيسية', path: '/home' },
    { label: 'الطلبات', path: '/orders' },
    { label: 'التقارير', path: '/reports' },
    { label: 'الإعدادات', path: '/settings' }
  ];
  constructor(private keycloak: KeycloakService, private router: Router) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile() {
    this.dropdownOpen = false;
    this.router.navigate(['/profile']); // replace with your profile route
  }

  logout() {
    this.dropdownOpen = false;
    // this.keycloak.logout();
  }
}
