import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { PostsModule } from '../posts.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent], 
      imports: [RouterTestingModule, HttpClientTestingModule],
      // providers: [
      //   {
      //     provide: ActivatedRoute,
      //     useValue: {
      //       // mock the ActivatedRoute methods or properties used by the component
      //       paramMap: of({ id: '1' }) // Example: mock paramMap
      //     }
      //   }
      // ]
      // Add any other imports or providers needed for testing
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
