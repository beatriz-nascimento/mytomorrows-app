import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClinicalTrialsService } from '../services/clinical-trials.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule, MatButtonModule ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class NavigationComponent {
    clinicalTrialsService = inject(ClinicalTrialsService);
    numberOfFavoriteItems = this.clinicalTrialsService.favoriteItemsLength; 
}
