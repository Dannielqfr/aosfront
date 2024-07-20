import { Routes } from '@angular/router';
import { PeopleComponent } from './business/people/people.component';
import { WorkshopsComponent } from './business/workshops/workshops.component';
import { InscriptionsComponent } from './business/inscriptions/inscriptions.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './business/login/login.component';
import { authGuard, authGuard2 } from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'people',
        component: PeopleComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'workshops',
        component: WorkshopsComponent,
        canActivate: [authGuard2],
      },
      {
        path: 'inscriptions',
        component: InscriptionsComponent,
        canActivate: [authGuard2],
        // component: InscriptionsComponent,
      },
    ],
  },
];
