import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPhotoComponent } from './album-photo.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('AlbumPhotoComponent', () => {
  let component: AlbumPhotoComponent;
  let fixture: ComponentFixture<AlbumPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumPhotoComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
