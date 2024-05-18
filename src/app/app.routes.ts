import { Routes } from '@angular/router';
import { PeopleComponent } from './business/people/people.component';
import { WorkshopsComponent } from './business/workshops/workshops.component';
import { InscriptionsComponent } from './business/inscriptions/inscriptions.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './business/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'people',
        component: PeopleComponent,
      },
      {
        path: 'workshops',
        component: PeopleComponent,
        // component: WorkshopsComponent,
      },
      {
        path: 'inscriptions',
        component: PeopleComponent,
        // component: InscriptionsComponent,
      },
    ],
  },
];
