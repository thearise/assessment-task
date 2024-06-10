import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosListComponent } from './photos-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from '@angular/forms';
import { PhotoService } from '../../services/photos/photo.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;
  let photoService: jest.Mocked<PhotoService>;
  let router: Router;

  beforeEach(async () => {
    const photoServiceMock = {
      getPhotos: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PhotosListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: PhotoService, useValue: photoServiceMock },
        PaginationService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ page: '1', search: '', sort: 'id' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService) as jest.Mocked<PhotoService>;
    router = TestBed.inject(Router); // Inject the Router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.searchQuery).toBe('');
    expect(component.sortBy).toBe('id');
  });

  it('should fetch photos on init', () => {
    const mockPhotos = [{ id: 1, albumId: 1, title: 'Photo 1', url: 'https://example.com/photo1.jpg', thumbnailUrl: 'https://example.com/photo1.jpg'}];
    photoService.getPhotos.mockReturnValue(of(mockPhotos));

    component.ngOnInit();

    // Simulate the queryParams subscription triggering fetchPhotos
    fixture.whenStable().then(() => {
      expect(component.loading).toBe(true);
      expect(photoService.getPhotos).toHaveBeenCalled();
    });
  });

  it('should handle error while fetching photos', () => {
    photoService.getPhotos.mockReturnValue(throwError('error'));

    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('An error occurred while fetching photos.');
  });

  // Add more test cases as needed for other functionalities
});
