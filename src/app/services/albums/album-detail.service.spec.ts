import { TestBed } from '@angular/core/testing';

import { AlbumDetailService } from './album-detail.service';

describe('AlbumDetailService', () => {
  let service: AlbumDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
