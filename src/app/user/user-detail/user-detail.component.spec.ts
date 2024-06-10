import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlbumService } from '../../services/albums/album.service';
import { PhotoService } from '../../services/photos/photo.service';
import { PostService } from '../../services/posts/post.service';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let albumService: jest.Mocked<AlbumService>;
  let photoService: jest.Mocked<PhotoService>;
  let postService: jest.Mocked<PostService>;
  let router: Router;

  beforeEach(async () => {
    const albumServiceMock = {
      getAlbumns: jest.fn()
    };
    const photoServiceMock = {
      getPhotos: jest.fn()
    };
    const postServiceMock = {
      getPosts: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: AlbumService, useValue: albumServiceMock },
        { provide: PhotoService, useValue: photoServiceMock },
        { provide: PostService, useValue: postServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: { get: () => '1' } }, // Simulated user ID
            queryParams: of({ page: '1', search: '', sort: 'id' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    albumService = TestBed.inject(AlbumService) as jest.Mocked<AlbumService>;
    photoService = TestBed.inject(PhotoService) as jest.Mocked<PhotoService>;
    postService = TestBed.inject(PostService) as jest.Mocked<PostService>;
    router = TestBed.inject(Router);
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
      expect(component.albumId).toBe(1); // Simulated user ID
    });
  });

  it('should fetch albums on init', () => {
    const mockAlbums = [{ id: 1, userId: 1, title: 'Album 1' }];
    albumService.getAlbumns.mockReturnValue(of(mockAlbums));

    component.ngOnInit();

    // Simulate the queryParams subscription triggering fetchAlbums
    fixture.whenStable().then(() => {
      expect(component.loadingAlbum).toBe(true);
      expect(albumService.getAlbumns).toHaveBeenCalled();
      expect(component.albums).toEqual(mockAlbums);
      expect(component.limitedAlbums).toEqual(mockAlbums.slice(0, 9));
      expect(component.loadingAlbum).toBe(false);
      expect(component.errorAlbum).toBe('');
    });
  });
});
