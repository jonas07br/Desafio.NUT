import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MetricsViewComponent } from './components/metrics-view/metrics-view.component';

export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'metrics',
    component:MetricsViewComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];
