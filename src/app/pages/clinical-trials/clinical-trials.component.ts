import { Component, inject } from '@angular/core';
import { ClinicalTrialsService } from '../../components/services/clinical-trials.service';
import { CommonModule } from '@angular/common';
import { FormattedStudyItem } from './clinical-trials.interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ItemsListComponent } from "../../components/items-list/items-list.component";

@Component({
  selector: 'app-clinical-trials',
  imports: [CommonModule, MatSlideToggleModule, ItemsListComponent],
  templateUrl: './clinical-trials.html',
  styles: '',
})
export class ClinicalTrials {
  private trialsService = inject(ClinicalTrialsService);
  checked = this.trialsService.isPolling;
  dataSource$ = this.trialsService.clinicalTrialWithFavorite$;

  toggleFavorites(row: FormattedStudyItem) {
    this.trialsService.toggleFavorites(row)
  }

  toggleChanges() {
    this.trialsService.togglePolling()
  }

}


