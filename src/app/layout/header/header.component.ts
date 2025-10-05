import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dropdownOpen = false;
  menuItems = [
    { label: 'الرئيسية', path: '/dashboard' },
    { label: 'الحوكمة', path: '/hawkameh' },
    { label: 'الإعدادات الشركة ', path: '/company' },
        { label: ' المستخدمين ', path: '/users' },

    { label: 'المراحل الداخلية', path: '/reports' },
    { label: ' الجمعية العامة', path: '/settings' },

    { label: 'مجلس الادارة', path: '/settings' },
    { label: ' اللجان', path: '/settings' },
    { label: ' المخاطر', path: '/settings' },
  ];
  constructor(private router: Router, private auth: AuthService) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile() {
    this.dropdownOpen = false;
    this.router.navigate(['/profile']); // replace with your profile route
  }

  logout() {
    this.dropdownOpen = false;
    this.auth.logout();
    this.router.navigate(['/']); // replace with your profile route
  }
}
