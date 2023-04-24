import { TestBed } from '@angular/core/testing';

import { SportmonksService } from './sportmonks.service';

describe('SportmonksService', () => {
  let service: SportmonksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportmonksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
