import { Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
  {
    path: '',
    component: MainComponent,
  },
  {
    path: '',
    component: FooterComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
];
