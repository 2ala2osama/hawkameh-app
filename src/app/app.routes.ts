import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () =>
//       import('./../app/pages/sessions/sessions.module').then(
//         (m) => m.SessionsModule
//       ),
//   },
//   {
//     path:'',
//     component:DashboardComponent,
//     // canActivate:[AuthGuard]
//   },
   {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent , canActivate: [authGuard] },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
