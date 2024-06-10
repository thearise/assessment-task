import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDetailComponent } from './dashboard-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlbumService } from '../../services/albums/album.service';
import { PhotoService } from '../../services/photos/photo.service';
import { PostService } from '../../services/posts/post.service';

describe('DashboardDetailComponent', () => {
  let component: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;
  let photoService: jest.Mocked<PhotoService>;
  let albumService: jest.Mocked<AlbumService>;
  let postService: jest.Mocked<PostService>;
  let router: Router;

  beforeEach(async () => {
    const photoServiceMock = {
      getPhotos: jest.fn()
    };
    const albumServiceMock = {
      getAlbumns: jest.fn()
    };
    const postServiceMock = {
      getPosts: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: PhotoService, useValue: photoServiceMock },
        { provide: AlbumService, useValue: albumServiceMock },
        { provide: PostService, useValue: postServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1' // Simulating the albumId
              }
            },
            queryParams: of({ page: '1', search: '', sort: 'id' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardDetailComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService) as jest.Mocked<PhotoService>;
    albumService = TestBed.inject(AlbumService) as jest.Mocked<AlbumService>;
    postService = TestBed.inject(PostService) as jest.Mocked<PostService>;
    router = TestBed.inject(Router); // Inject the Router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    fixture.whenStable().then(() => {
      expect(component.photos).toEqual([]);
      expect(component.limitedPhotos).toEqual([]);
      expect(component.loadingPhoto).toBe(false);
      expect(component.errorPhoto).toBe('');
      expect(component.albums).toEqual([]);
      expect(component.limitedAlbums).toEqual([]);
      expect(component.loadingAlbum).toBe(false);
      expect(component.errorAlbum).toBe('');
      expect(component.posts).toEqual([]);
      expect(component.limitedPosts).toEqual([]);
      expect(component.loadingPost).toBe(false);
      expect(component.errorPost).toBe('');
      expect(component.albumId).toBe(1); // Simulated albumId from ActivatedRoute
    });
    
  });

  it('should fetch photos on init', () => {
    const mockPhotos = [{ id: 1, albumId: 1, title: 'Photo 1', url: 'https://example.com/photo1.jpg', thumbnailUrl: 'https://example.com/photo1.jpg'}];
    photoService.getPhotos.mockReturnValue(of(mockPhotos));

    component.ngOnInit();

    // Simulate the queryParams subscription triggering fetchPhotos
    fixture.whenStable().then(() => {
      expect(component.loadingPhoto).toBe(true);
      expect(photoService.getPhotos).toHaveBeenCalled();
      expect(component.photos).toEqual(mockPhotos);
      expect(component.limitedPhotos).toEqual(mockPhotos.slice(0, 9));
      expect(component.loadingPhoto).toBe(false);
      expect(component.errorPhoto).toBe('');
    });
  });
});
