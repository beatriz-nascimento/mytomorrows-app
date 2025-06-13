import { Component, inject } from '@angular/core';
import { ClinicalTrialsService } from './clinical-trials.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormattedStudyItem } from './clinical-trials.interface';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-clinical-trials',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule, MatSlideToggleModule],
  templateUrl: './clinical-trials.html',
  styleUrl: './clinical-trials.scss',
})
export class ClinicalTrials {
  private trialsService = inject(ClinicalTrialsService);
  displayedColumns: string[] = ['select', 'id', 'name', 'status'];
  checked = this.trialsService.isPolling()
  dataSource$ = this.trialsService.clinicalTrialWithFavorite$;

  toggleFavorites(row: FormattedStudyItem, event: MouseEvent) {
    event.stopPropagation();
    this.trialsService.toggleFavorites(row)
  }

  toggleChanges(event: MatSlideToggleChange) {
    console.log(event, 'toggle')
    this.trialsService.togglePolling()
  }




}


