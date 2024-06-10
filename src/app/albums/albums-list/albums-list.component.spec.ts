import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumsListComponent } from './albums-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/albums/album.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { PhotoService } from '../../services/photos/photo.service';

describe('AlbumsListComponent', () => {
  let component: AlbumsListComponent;
  let fixture: ComponentFixture<AlbumsListComponent>;
  let albumService: jest.Mocked<AlbumService>;
  let photoService: jest.Mocked<PhotoService>;
  let router: Router;

  beforeEach(async () => {
    const albumServiceMock = {
      getAlbumns: jest.fn()
    };
    const photoServiceMock = {
      getPhotos: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AlbumsListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: AlbumService, useValue: albumServiceMock },
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

    fixture = TestBed.createComponent(AlbumsListComponent);
    component = fixture.componentInstance;
    albumService = TestBed.inject(AlbumService) as jest.Mocked<AlbumService>;
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

  it('should fetch albums and photos on init', () => {
    const mockAlbums = [{ id: 1, title: 'Album 1', userId: 1 }];
    const mockPhotos = [{ id: 1, albumId: 1, title: 'Photo 1', url: 'https://example.com/photo1.jpg', thumbnailUrl: 'https://example.com/photo1.jpg'}];

    albumService.getAlbumns.mockReturnValue(of(mockAlbums));
    photoService.getPhotos.mockReturnValue(of(mockPhotos));

    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(component.albums).toEqual(mockAlbums);
      expect(component.photos).toEqual(mockPhotos);
      expect(component.loading).toBe(true);
      expect(component.loadingPhotos).toBe(true);
    });
  });

  it('should handle error while fetching albums', () => {
    // Mock setup to return an error observable
    const errorMessage = 'Error fetching albums';
    albumService.getAlbumns.mockReturnValue(throwError(errorMessage));
  
    // Trigger ngOnInit
    component.ngOnInit();
  
    // Wait for asynchronous operations to complete
    fixture.whenStable().then(() => {
      // Assert loading state is set to false
      expect(component.loading).toBe(false);
      // Assert error message is correctly updated
      expect(component.error).toBe(errorMessage);
    });
  });
});
