import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Album } from '../../services/albums/album.model';
import { AlbumService } from '../../services/albums/album.service';
import { Photo } from '../../services/photos/photo.model';
import { PhotoService } from '../../services/photos/photo.service';
import { Post } from '../../services/posts/post.model';
import { PostService } from '../../services/posts/post.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  photos: Photo[] = [];
  limitedPhotos: Photo[] = [];
  loadingPhoto: boolean = false;
  errorPhoto: string = '';

  posts: Post[] = [];
  limitedPosts: Post[] = [];
  loadingPost: boolean = false;
  errorPost: string = '';

  albums: Album[] = [];
  limitedAlbums: Album[] = [];
  loadingAlbum: boolean = false;
  errorAlbum: string = '';

  albumId: number | null = null;

  idParam: any = null;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private albumService: AlbumService,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.queryParamMap.get('id');
    this.route.queryParams.subscribe(params => {
      // this.fetchPhotos(params);
      this.fetchAlbums(params);
      this.fetchPosts(params);
    })
  }

  //   fetchPhotos(): void {
  //     // Replace this with your actual photo fetching logic
  //     const allPhotos: Photo[] = [
  //       {
  //         id: 1, albumId: 1, title: 'Photo 1', url: 'https://picsum.photos/id/1/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 2, albumId: 1, title: 'Photo 2', url: 'https://picsum.photos/id/2/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 3, albumId: 1, title: 'Photo 3', url: 'https://picsum.photos/id/3/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 4, albumId: 1, title: 'Photo 4', url: 'https://picsum.photos/id/4/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 5, albumId: 1, title: 'Photo 5', url: 'https://picsum.photos/id/5/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 6, albumId: 1, title: 'Photo 6', url: 'https://picsum.photos/id/6/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 7, albumId: 1, title: 'Photo 1', url: 'https://picsum.photos/id/1/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 8, albumId: 1, title: 'Photo 2', url: 'https://picsum.photos/id/2/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 9, albumId: 1, title: 'Photo 3', url: 'https://picsum.photos/id/3/600/400',
  //         thumbnailUrl: ''
  //       },
  //       {
  //         id: 10, albumId: 1, title: 'Photo 4', url: 'https://picsum.photos/id/4/600/400',
  //         thumbnailUrl: ''
  //       },
  //       // Add more photos as needed
  //     ];

  //     // Filter photos by albumId
  //     // this.photos = allPhotos.filter((photo: Photo) => photo.albumId === this.albumId);

  //     // Limit the photos to a maximum of 5
  //     // this.limitedPhotos = allPhotos.slice(0, 5);
  //     this.limitedPhotos = allPhotos;
  //   }
  // }

  goToPostDetail(id: number): void {
    const url = `/posts/post-detail?id=${id}`;
    this.router.navigateByUrl(url);
  }

  goToPhotoDetail(id: number, albumId: number): void {
    const url = `/photos/photo-detail?id=${id}&albumId=${albumId}`;
    this.router.navigateByUrl(url);
  }

  goToAlbumDetail(id: number): void {
    const url = `/albums/album-detail?id=${id}`;
    this.router.navigateByUrl(url);
  }

  

  fetchPhotos(params: Params) {
    this.loadingPhoto = true;
    this.errorPhoto = '';
    this.photoService.getPhotos(params).subscribe(
      (photos: Photo[]) => {
        this.photos = photos;
        this.limitedPhotos = photos.slice(0, 9)
        this.loadingPhoto = false;
      },
      (error: any) => {
        this.errorPhoto = "An error occurred while fetching albums.";
        this.loadingPhoto = false;
      }
    )
  }

  fetchAlbums(params: Params) {
    this.loadingAlbum = true;
    this.errorAlbum = '';
    console.log('fetch albums: ' + this.idParam.toString());
    this.albumService.getAlbumns(params).subscribe(
      (albums: Album[]) => {
        this.albums = albums.filter((album: Album) => {
          return album.userId.toString() === this.idParam.toString();
        });
        this.limitedAlbums = albums.slice(0, 9)
        this.loadingAlbum = false;
      },
      (error: any) => {
        this.errorAlbum = "An error occurred while fetching albums.";
        this.loadingAlbum = false;
      }
    )
  }

  fetchPosts(params: Params) {
    this.loadingPost = true;
    this.errorPost = '';
    this.postService.getPosts(params).subscribe(
      (posts: Post[]) => {
        this.posts = posts.filter((post: Post) => {
          return post.userId.toString() === this.idParam.toString();
        });
        this.limitedPosts = posts.slice(0, 9)
        this.loadingPost = false;
      },
      (error: any) => {
        this.errorPost = "An error occurred while fetching albums.";
        this.loadingPost = false;
      }
    )
  }
}
