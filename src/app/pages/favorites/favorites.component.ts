import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from '../../components/items-list/items-list';
import { ClinicalTrialsService } from '../clinical-trials/clinical-trials.service';
import { FormattedStudyItem } from '../clinical-trials/clinical-trials.interface';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, ItemsListComponent],
  templateUrl: './favorites.html',
  styles: '',
})
export class FavoritesComponent {
  clinicalTrialsService = inject(ClinicalTrialsService)
  favoriteTrials$ = this.clinicalTrialsService.favoriteTrials$; 

toggleFavorites(row: FormattedStudyItem) {
    this.clinicalTrialsService.toggleFavorites(row)
}

}
