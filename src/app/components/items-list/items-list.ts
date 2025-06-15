import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormattedStudyItem } from '../../pages/clinical-trials/clinical-trials.interface';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './items-list.html',
})
export class ItemsListComponent {
  @Input() items$!: Observable<FormattedStudyItem[]>;
  @Output() toggleFavorites = new EventEmitter()

  displayedColumns: string[] = ['select', 'id', 'name', 'status'];

  toggleFavoriteItem(item: FormattedStudyItem, event: MouseEvent) {
    event.stopPropagation();
    this.toggleFavorites.emit(item)
  }

}