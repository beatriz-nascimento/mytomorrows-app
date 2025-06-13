import { Component, inject } from '@angular/core';
import { ClinicalTrialsService } from './clinical-trials.service';
import { CommonModule } from '@angular/common';
import { FormattedStudyItem } from './clinical-trials.interface';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ItemsListComponent } from "../components/items-list/items-list";

@Component({
  selector: 'app-clinical-trials',
  imports: [CommonModule, MatSlideToggleModule, ItemsListComponent],
  templateUrl: './clinical-trials.html',
  styleUrl: './clinical-trials.scss',
})
export class ClinicalTrials {
  private trialsService = inject(ClinicalTrialsService);
  displayedColumns: string[] = ['select', 'id', 'name', 'status'];
  checked = this.trialsService.isPolling;
  dataSource$ = this.trialsService.clinicalTrialWithFavorite$;

  toggleFavorites(row: FormattedStudyItem) {
    this.trialsService.toggleFavorites(row)
  }

  toggleChanges(event: MatSlideToggleChange) {
    console.log(event, 'toggle')
    this.trialsService.togglePolling()
  }

}


