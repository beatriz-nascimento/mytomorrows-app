import { Routes } from '@angular/router';
import { ClinicalTrials } from './clinical-trials/clinical-trials';
import { FavoritesComponent } from './favorites/favorites';

export const routes: Routes = [
  { path: '', redirectTo: 'trials', pathMatch: 'full' },
  { path: 'trials', component: ClinicalTrials },
  { path: 'favorites', component: FavoritesComponent },
];
