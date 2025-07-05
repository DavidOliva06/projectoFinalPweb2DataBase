import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  // Todas las rutas principales usarán nuestro MainLayoutComponent como base
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home, title: 'Inicio - TorneoPro' },

      { path: 'login', component: Login, title: 'Iniciar Sesión - TorneoPro' },

      { path: 'registro', component: Register, title: 'Registro - TorneoPro' },

      // Dejamos preparada la ruta para el fixture que haremos más adelante
      // { path: 'fixture', component: FixtureListComponent, title: 'Fixture - TorneoPro' },
    ]
  },
  // { path: '**', component: NotFoundComponent }
];