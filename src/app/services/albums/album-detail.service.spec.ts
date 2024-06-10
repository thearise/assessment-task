import { TestBed } from '@angular/core/testing';

import { AlbumDetailService } from './album-detail.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AlbumDetailService', () => {
  let service: AlbumDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AlbumDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
