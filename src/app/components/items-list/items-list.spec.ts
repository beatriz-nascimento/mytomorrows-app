import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { listOfFavorites } from '../../utils/mock-data';

describe('ItemsListComponent', () => {
  let fixture: ComponentFixture<ItemsListComponent>;
  let component: ItemsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    component.items$ = of(listOfFavorites);

  fixture.detectChanges();

  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all rows in the table', async () => {
  const rows = fixture.debugElement.queryAll(By.css('tr.mat-mdc-row'));  
  expect(rows.length).toBe(2);
});

  it('should display correct values in columns', () => {
    const cells = fixture.debugElement.queryAll(By.css('td.mat-mdc-cell'));
    const cellTexts = cells.map(c => c.nativeElement.textContent.trim());

    expect(cellTexts).toContain('ID01');
    expect(cellTexts).toContain('Trial A');
    expect(cellTexts).toContain('ID02');
    expect(cellTexts).toContain('Trial B');
  });

  it('should display correct icon based on favorite status', () => {
    const icons = fixture.debugElement.queryAll(By.css('mat-icon'));
    expect(icons[0].nativeElement.textContent.trim()).toBe('favorite');
    expect(icons[1].nativeElement.textContent.trim()).toBe('favorite_outline');
  });

  it('should emit toggleFavorites when icon button is clicked', () => {
    spyOn(component.toggleFavorites, 'emit');
    const button = fixture.debugElement.queryAll(By.css('button'))[1]; 
    button.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.toggleFavorites.emit).toHaveBeenCalledWith({
      id: 'ID02',
      favorite: false,
      briefTitle: 'Trial B',
      status: 'Recruiting'
    });
  });
});