import { TestBed } from '@angular/core/testing';

import { SidebarStatusService } from './sidebar-status.service';

describe('SidebarStatusService', () => {
  let service: SidebarStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
