import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  /* HOME
   ******************************/
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./shared/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },

  /* AUTHENTICATION
   ******************************/
  {
    path: 'user',
    children: [
      {
        path: 'signup',
        loadComponent: () =>
          import('./core/auth/pages/signup-page/signup-page.component').then(
            (m) => m.SignupPageComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/pages/login-page/login-page.component').then(
            (m) => m.LoginPageComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./core/auth/pages/profile-page/profile-page.component').then(
            (m) => m.ProfilePageComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  /* FEATURES
   ******************************/
  {
    path: 'types',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/pages/type/type-page.component').then(
            (m) => m.TypePageComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'turbines',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/pages/turbine/turbine-page.component').then(
            (m) => m.TurbinePageComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'projects',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/pages/projects/project-dashboard.component').then(
            (m) => m.ProjectDashboardComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/pages/project/project-page.component').then(
            (m) => m.ProjectPageComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'warnings',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/pages/warning/warning-page.component').then(
            (m) => m.WarningPageComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'reports',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/pages/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  /* ERRORS
   ******************************/
  {
    path: '401',
    loadComponent: () =>
      import(
        './core/errors/unauthorized-access/unauthorized-access.component'
      ).then((m) => m.UnauthorizedAccessComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/errors/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
