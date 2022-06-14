import { TestBed } from '@angular/core/testing';

import { HttpserverService } from './httpserver.service';

describe('HttpserverService', () => {
  let service: HttpserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
