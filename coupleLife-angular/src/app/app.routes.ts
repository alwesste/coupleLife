import { Routes } from '@angular/router';
import {HomeComponent} from './shared/components/test/home/home.component';
import {Home2Component} from './shared/components/test/home2/home2.component';
// import {Home3Component} from './shared/components/home3/home3.component';
import {AccueilComponent} from './features/accueil/accueil.component';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home2', component: Home2Component },
  // { path: 'home3', component: Home3Component },

];
