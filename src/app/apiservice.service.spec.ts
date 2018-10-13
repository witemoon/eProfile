import { TestBed, inject } from '@angular/core/testing';

import { EProfileService } from './apiservice.service';

describe('APIserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EProfileService]
    });
  });

  it('should be created', inject([EProfileService], (service: EProfileService) => {
    expect(service).toBeTruthy();
  }));
});
