import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home.component').then((m) => m.HomeComponent),
    title: 'Jaime Quiceno | Software Architect'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
    title: 'Admin Login | Jaime Quiceno'
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'Portfolio Admin | Jaime Quiceno'
  },
  { path: '**', redirectTo: '' }
];
