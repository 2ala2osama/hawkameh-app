import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginPageComponent } from './pages/sessions/login-page/login-page.component';
import { HawkamehComponent } from './pages/hawkameh/hawkameh.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { authGuard } from './core/guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/sessions/sessions.module').then((m) => m.SessionsModule),
  }, // root → home
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent , canActivate:[authGuard]}, // home → dashboard
      { path: 'hawkameh', component: HawkamehComponent }, // home → dashboard
      { path: 'company', component: CompaniesComponent }, // home → dashboard
      { path: 'users', component: UsersComponent }, // home → dashboard
    ],
  },
  { path: '**', redirectTo: 'home' }, // fallback
];
