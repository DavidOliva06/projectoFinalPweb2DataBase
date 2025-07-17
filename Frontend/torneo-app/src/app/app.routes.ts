import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { FixtureList } from './pages/fixture-list/fixture-list';

export const routes: Routes = [
  // Todas las rutas principales usarán nuestro MainLayoutComponent como base
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home, title: 'Inicio - TorneoPro' },

      { path: 'login', component: Login, title: 'Iniciar Sesión - TorneoPro' },

      { path: 'registro', component: Register, title: 'Registro - TorneoPro' },

      { path: 'fixture', component: FixtureList, title: 'Fixture - TorneoPro' },
    ]
  },
  // { path: '**', component: NotFoundComponent }
];