import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/authentication/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate:[loggedGuard],
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'register',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'login',
      },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate:[authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'home',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
        title: 'about',
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./pages/gallery/gallery.component').then(
            (m) => m.GalleryComponent
          ),
        title: 'gallery',
      },
      {
        path: 'notes',
        loadComponent: () =>
          import('./pages/notes/notes.component').then((m) => m.NotesComponent),
        title: 'notes',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfouned/notfouned.component').then(
        (m) => m.NotfounedComponent
      ),
    title: 'error',
  },
];
