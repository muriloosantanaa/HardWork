import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AdminPanel } from './pages/admin-panel/admin-panel';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'admin', component: AdminPanel }
];