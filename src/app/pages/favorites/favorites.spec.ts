import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ClinicalTrialsService } from '../../components/services/clinical-trials.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { favoriteTrial, mockClinicalTrialsList, mockStudy } from '../../utils/mock-data';
import { ItemsListComponent } from '../../components/items-list/items-list';
describe('Favorites Component', () => {
    let component: FavoritesComponent;
    let fixture: ComponentFixture<FavoritesComponent>;
    let service: ClinicalTrialsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FavoritesComponent],
            providers: [provideZonelessChangeDetection(),
            provideHttpClient(),
            provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FavoritesComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ClinicalTrialsService);
    });

    it('should create favorites component', () => {
        expect(component).toBeTruthy();
    });

    it('should pass favoriteTrials to ItemsListComponent', async () => {
        await fixture.whenStable();
        
        const listComponent = fixture.debugElement.query(By.directive(ItemsListComponent));
        expect(listComponent).toBeTruthy();
        expect(listComponent.componentInstance.items$).toBe(component.favoriteTrials$);
    });

    it('should call toggleFavorites from service', () => {
        const toggleSpy = spyOn(service, 'toggleFavorites');
        component.toggleFavorites(favoriteTrial);
        expect(toggleSpy).toHaveBeenCalledWith(favoriteTrial);
    });

    it('should display trials by ids', async () => {
        const numberOfTrias = 8;
        spyOn(service, 'getClinicalTrialById').and.callFake((id: string) => {
            return of(mockStudy(id));
        });

        service['selectedItems'].set(mockClinicalTrialsList(numberOfTrias));

        await fixture.whenStable();
        const rows = fixture.debugElement.nativeElement.querySelectorAll('tr.mat-mdc-row');
        expect(rows.length).toEqual(numberOfTrias);
    });
});
