import { TestBed } from '@angular/core/testing';

import { PhotoDetailService } from './photo-detail.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PhotoDetailService', () => {
  let service: PhotoDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(PhotoDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
