import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: '**', redirectTo: 'Home' },
];
