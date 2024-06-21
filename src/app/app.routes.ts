import { RegisterComponent } from './component/pages/register/register.component';
import { Routes } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './component/pages/login/login.component';
import { ContactsComponent } from './component/pages/contacts/contacts.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
];
