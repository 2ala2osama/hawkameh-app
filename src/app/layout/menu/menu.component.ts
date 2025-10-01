import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
})
export class SidebarComponent {
  isSidebarClosed = false;

  menuItems = [
    { label: 'الرئيسية', path: '/home' },
    { label: 'الطلبات', path: '/orders' },
    { label: 'التقارير', path: '/reports' },
    { label: 'الإعدادات', path: '/settings' }
  ];

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
