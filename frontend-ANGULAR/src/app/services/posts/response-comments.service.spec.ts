import { TestBed } from '@angular/core/testing';

import { ResponseCommentsService } from './response-comments.service';

describe('ResponseCommentsService', () => {
  let service: ResponseCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
