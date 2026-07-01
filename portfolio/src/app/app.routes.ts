import { Routes } from '@angular/router';
import { VisitorComponent } from './pages/visitor/visitor';
import { HomeComponent } from './pages/home/home';
import { AdminComponent } from './pages/admin/admin';
import { AdminLoginComponent } from './pages/admin-login/admin-login';

export const routes: Routes = [

  {
    path: '',
    component: VisitorComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'admin',
    component: AdminComponent
  },

  {
    path: 'admin-login',
    component: AdminLoginComponent
},

  {
    path: '**',
    redirectTo: ''
  }

];