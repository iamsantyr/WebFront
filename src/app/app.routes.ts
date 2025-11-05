// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth
  { path: 'login', loadComponent: () => import('./autenticacion-y-cuentas/login/login').then(m => m.Login) },

  // Home
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },

  // Empresas
  { path: 'company-form', loadComponent: () => import('./gestion-de-empresas/company-form/company-form').then(m => m.CompanyForm) },
  { path: 'companies-list', loadComponent: () => import('./gestion-de-empresas/companies-list/companies-list').then(m => m.CompaniesList) },

  // Wildcard SIEMPRE al final
  { path: '**', redirectTo: 'login' },
];
