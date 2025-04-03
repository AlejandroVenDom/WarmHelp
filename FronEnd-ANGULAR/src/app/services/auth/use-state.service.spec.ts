import { TestBed } from '@angular/core/testing';

import { UseStateService } from './use-state.service';

describe('UseStateService', () => {
  let service: UseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
