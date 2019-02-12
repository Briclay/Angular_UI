import { TestBed } from '@angular/core/testing';

import { NcmService } from './ncm.service';

describe('NcmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NcmService = TestBed.get(NcmService);
    expect(service).toBeTruthy();
  });
});
