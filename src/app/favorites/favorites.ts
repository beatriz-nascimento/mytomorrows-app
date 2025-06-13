import { Component, inject, OnInit } from '@angular/core';
import { ClinicalTrialsService } from '../clinical-trials/clinical-trials.service';
import { filter, forkJoin, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormattedStudyItem } from '../clinical-trials/clinical-trials.interface';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
    standalone: true,
})
export class FavoritesComponent {
  clinicalTrialsService = inject(ClinicalTrialsService)
  displayedColumns: string[] = ['select', 'id', 'name', 'status'];
  favoriteTrials$ = this.clinicalTrialsService.favoriteTrials$; 

toggleFavorites(row: FormattedStudyItem, event: MouseEvent) {
    event.stopPropagation();
    this.clinicalTrialsService.toggleFavorites(row)
}

}
