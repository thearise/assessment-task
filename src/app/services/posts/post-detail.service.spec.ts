import { TestBed } from '@angular/core/testing';

import { PostDetailService } from './post-detail.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PostDetailService', () => {
  let service: PostDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(PostDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
