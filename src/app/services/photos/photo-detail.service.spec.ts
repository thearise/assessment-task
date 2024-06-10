import { TestBed } from '@angular/core/testing';

import { PhotoDetailService } from './photo-detail.service';

describe('PhotoDetailService', () => {
  let service: PhotoDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
