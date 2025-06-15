import { inject, TestBed } from '@angular/core/testing';
import { ClinicalTrialsService } from './clinical-trials.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { getDataFromAPIResponse } from '../../utils/mock-data';
import { provideHttpClient } from '@angular/common/http';

describe('ClinicalTrialsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClinicalTrialsService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        provideRouter(routes)]
    });
  });

  it('should fetch trials from API', inject(
    [ClinicalTrialsService, HttpTestingController],
    (service: ClinicalTrialsService, httpMock: HttpTestingController) => {

      service['fetchTrialsFromAPI']().subscribe(response => {
        expect(response.studies.length).toBe(1);
        expect(response.studies[0].protocolSection?.identificationModule?.nctId).toBe('ID12');
      });

      const req = httpMock.expectOne(r => r.url.includes('/studies'));
      expect(req.request.method).toBe('GET');
      req.flush(getDataFromAPIResponse);
    }
  ));

  it('should handle fetch error', inject(
    [ClinicalTrialsService, HttpTestingController],
    (service: ClinicalTrialsService, httpMock: HttpTestingController) => {
      spyOn(console, 'error');

      service['fetchTrialsFromAPI']().subscribe({
        next: () => fail('should not emit value'),
        error: () => fail('should catch error and return EMPTY')
      });

      const req = httpMock.expectOne(r => r.url.includes('/studies'));
      req.error(new ErrorEvent('Network error'));
      expect(console.error).toHaveBeenCalledWith('Failed to fetch trials', jasmine.anything());
    }
  ));

  it('should toggle polling state', inject(
    [ClinicalTrialsService],
    (service: ClinicalTrialsService) => {
      const initial = service['pollingEnabled']();
      service.togglePolling();
      expect(service['pollingEnabled']()).toBe(!initial);
    }
  ));

});