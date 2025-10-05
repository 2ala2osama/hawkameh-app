import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginPageComponent } from './pages/sessions/login-page/login-page.component';
import { HawkamehComponent } from './pages/hawkameh/hawkameh.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { authGuard } from './core/guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { GeneralsMeetingsComponent } from './pages/generals-meetings/generals-meetings.component';
import { BoardOfDirctorsComponent } from './pages/board-of-dirctors/board-of-dirctors.component';
import { RisksComponent } from './pages/risks/risks.component';
import { InteranalStagesComponent } from './pages/interanal-stages/interanal-stages.component';
import { AljanComponent } from './pages/aljan/aljan.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/sessions/sessions.module').then((m) => m.SessionsModule),
  }, // root → home
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent  , canActivate:[authGuard]},
      {
        path: 'hawkameh',
        component: HawkamehComponent,
      },
      { path: 'company', component: CompaniesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'policies-details', component: PoliciesComponent },
      { path: 'meetings', component: GeneralsMeetingsComponent },
      { path: 'boarder-of-diretors', component: BoardOfDirctorsComponent },
      { path: 'risks', component: RisksComponent },
      { path: 'internal-stages', component: InteranalStagesComponent },

      { path: 'aljan', component: AljanComponent },




    ],
  },

  { path: '**', redirectTo: 'home' }, // fallback
];
