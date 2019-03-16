import { TestBed } from '@angular/core/testing';

import { BpdListService } from './bpd-list.service';

describe('BpdListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BpdListService = TestBed.get(BpdListService);
    expect(service).toBeTruthy();
  });
});
