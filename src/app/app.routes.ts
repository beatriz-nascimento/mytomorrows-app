import { Routes } from '@angular/router';
import { ClinicalTrials } from './pages/clinical-trials/clinical-trials.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trials', pathMatch: 'full' },
  { path: 'trials', component: ClinicalTrials },
  { path: 'favorites', component: FavoritesComponent },
];
