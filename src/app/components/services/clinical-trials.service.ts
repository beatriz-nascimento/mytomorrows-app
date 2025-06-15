import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, combineLatest, EMPTY, filter, forkJoin, map, mergeMap, Observable, of, switchMap, tap, timer } from 'rxjs';
import { ClinicalTrial, FormattedStudyItem, StudyItem } from '../../pages/clinical-trials/clinical-trials.interface';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})

export class ClinicalTrialsService {
  private apiUrl = 'https://clinicaltrials.gov/api/v2/studies';
  private http = inject(HttpClient);
  private pollingEnabled = signal(false);
  private selectedItems = signal<FormattedStudyItem[]>([]);
  private selectedItemsIds = computed(() => this.selectedItems().map(item => item.id));
  private favoritesIds$ = toObservable(this.selectedItemsIds);
  private clinicalTrials: WritableSignal<ClinicalTrial> = signal({ studies: [], nextPageToken: '' })
  private nextPageToken = signal<string | null>(null);
  public isPolling = computed(() => this.pollingEnabled())
  public favoriteItemsLength = computed(()=> (this.selectedItems().length || 0) )

  private clinicalTrialsList$ = toObservable(this.pollingEnabled).pipe(
    switchMap((isEnabled) => isEnabled ? this.handlePollingEnabled() : this.handlePollingDisabled())
  );

  private handlePollingEnabled(): Observable<FormattedStudyItem[]> {
    return this.pollingTrials().pipe(
      tap(response => this.storeTokenAndTrials(response)),
      map(response => this.mapResponseToTrials(response))
    );
  }

  private handlePollingDisabled(): Observable<FormattedStudyItem[]> {
    const clinicalTrials = this.clinicalTrials();
    if (clinicalTrials.studies.length) {
      return of(this.mapResponseToTrials(clinicalTrials));
    }

    return this.fetchTrialsFromAPI().pipe(
      tap(response => this.storeTokenAndTrials(response)),
      map(response => this.mapResponseToTrials(response))
    );
  }

  private pollingTrials(): Observable<ClinicalTrial> {
    return timer(0, 5000).pipe(
      switchMap(() => this.fetchTrialsFromAPI()),
      map(newItems => this.addNewTrial(newItems))
    );
  }

  private fetchTrialsFromAPI(): Observable<ClinicalTrial> {
    const url = new URL(this.apiUrl);
    const token = this.nextPageToken()
    if (token?.length) {
      url.searchParams.set('pageToken', token);
    }
    if (this.pollingEnabled()) {
      url.searchParams.set('pageSize', '1');
    }
    return this.http.get<ClinicalTrial>(url.toString()).pipe(
      catchError(error => {
        console.error('Failed to fetch trials', error);
        return EMPTY;
      })
    );
  }

  private storeTokenAndTrials(response: ClinicalTrial) {
    this.nextPageToken.set(response.nextPageToken ?? null);
    this.clinicalTrials.set(response);
  }

  private addNewTrial(newItems: ClinicalTrial): ClinicalTrial {
    const current = this.clinicalTrials()?.studies ?? [];
    const merged = [...newItems.studies, ...current].slice(0, 10); // always keep max 10

    return {
      ...newItems,
      studies: merged
    };
  }

  private mapResponseToTrials(response: ClinicalTrial): FormattedStudyItem[] {
    return response.studies.map(study => ({
      ...study,
      id: study.protocolSection?.identificationModule?.nctId,
      status: study.protocolSection?.statusModule?.overallStatus,
      briefTitle: study.protocolSection?.identificationModule?.briefTitle
    }));
  }


  public toggleFavorites(row: FormattedStudyItem) {
    const itemExists = this.selectedItemsIds().some(selected => selected === row.id)
    this.selectedItems.update(selected => { return (itemExists ? this.removeItem(row, selected) : this.addItem(row, selected)) });
  }

  private addItem(item: FormattedStudyItem, itemsList: FormattedStudyItem[]) {
    return [...itemsList, item];
  }

  private removeItem(item: FormattedStudyItem, itemsList: FormattedStudyItem[]) {
    return itemsList.filter(selectedItem => selectedItem.id !== item.id)
  }

  public clinicalTrialWithFavorite$ = combineLatest([this.clinicalTrialsList$, this.favoritesIds$]).pipe(
    map(([trialsList, favoriteIds]) =>
      trialsList.map(trial => ({
        ...trial,
        favorite: favoriteIds.includes(trial.id)
      }))
    )
  );

  public getClinicalTrialById(id: string) {
    return this.http.get<StudyItem>(`${this.apiUrl}/${id}`).pipe(
      map(study =>
      ({
        id: study.protocolSection?.identificationModule?.nctId,
        status: study.protocolSection?.statusModule?.overallStatus,
        briefTitle: study.protocolSection?.identificationModule?.briefTitle,
        favorite: true
      }))
    )
  }

  public favoriteTrials$ = this.favoritesIds$.pipe(
    filter(ids => Array.isArray(ids)),
    map(ids => ids.filter(id => typeof id === 'string')),
    mergeMap((validIds: string[]) =>
      validIds.length > 0
        ? forkJoin(validIds.map(id => this.getClinicalTrialById(id)))
        : of([])
    )
  );

  public togglePolling() {
    this.pollingEnabled.update(state => !state);
  }

}





