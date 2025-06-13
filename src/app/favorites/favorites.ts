import { Component, inject } from '@angular/core';
import { ClinicalTrialsService } from '../clinical-trials/clinical-trials.service';
import { CommonModule } from '@angular/common';
import { FormattedStudyItem } from '../clinical-trials/clinical-trials.interface';
import { ItemsListComponent } from "../components/items-list/items-list";

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, ItemsListComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class FavoritesComponent {
  clinicalTrialsService = inject(ClinicalTrialsService)
  displayedColumns: string[] = ['select', 'id', 'name', 'status'];
  favoriteTrials$ = this.clinicalTrialsService.favoriteTrials$; 

toggleFavorites(row: FormattedStudyItem) {
    this.clinicalTrialsService.toggleFavorites(row)
}

}
