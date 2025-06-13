import { inject, TestBed } from '@angular/core/testing';
import { ClinicalTrialsService } from './clinical-trials.service';
import { ClinicalTrial } from './clinical-trials.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('ClinicalTrialsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClinicalTrialsService,
        provideZonelessChangeDetection(),
          provideRouter(routes) ]
    });
  });

  it('should fetch trials from API', inject(
    [ClinicalTrialsService, HttpTestingController],
    (service: ClinicalTrialsService, httpMock: HttpTestingController) => {
      const mockResponse: ClinicalTrial = {
        studies: [
          {
            protocolSection: {
              identificationModule: {
                nctId: 'NCT12345',
                briefTitle: 'Test Trial'
              },
              statusModule: {
                overallStatus: 'Completed'
              }
            }
          }
        ],
        nextPageToken: 'token123'
      };

      service['fetchTrialsFromAPI']().subscribe(response => {
        expect(response.studies.length).toBe(1);
        expect(response.studies[0].protocolSection?.identificationModule?.nctId).toBe('NCT12345');
      });

      const req = httpMock.expectOne(r => r.url.includes('/studies'));
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    }
  ));

  it('should handle fetch error gracefully', inject(
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