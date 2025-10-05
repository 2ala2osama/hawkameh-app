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
    { label: 'الرئيسية', path: '/dashboard' },
    { label: ' المستخدمين ', path: '/users' },
    { label: 'الإعدادات الشركة ', path: '/company' },
    { label: 'الحوكمة', path: '/hawkameh' },
    { label: ' الجمعية العامة', path: '/meetings' },
    { label: 'مجلس الادارة', path: '/boarder-of-diretors' },
    { label: ' اللجان', path: '/aljan' },
    { label: 'المراجعة الداخلية', path: '/internal-stages' },
    { label: ' المخاطر', path: '/risks' },
    // { label: ' استشارات', path: '/settings' },

  ];
  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
