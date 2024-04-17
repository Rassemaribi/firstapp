import { TestBed } from '@angular/core/testing';

import { EvenmentService } from './evenment.service';

describe('EvenmentService', () => {
  let service: EvenmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
