import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '../../services/albums/album.model';
import { AlbumService } from '../../services/albums/album.service';
import { Photo } from '../../services/photos/photo.model';
import { PhotoService } from '../../services/photos/photo.service';
import { Post } from '../../services/posts/post.model';
import { PostService } from '../../services/posts/post.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrl: './dashboard-detail.component.css'
})
export class DashboardDetailComponent {
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

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private albumService: AlbumService,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.albumId = parseInt(this.route.snapshot.paramMap.get('albumId')!, 10);
    this.route.queryParams.subscribe(params => {
      this.fetchPhotos(params);
      this.fetchAlbums(params);
      this.fetchPosts(params);
    })
  }

  goToPostDetail(id: number): void {
    const url = `/posts/post-detail?id=${id}`;
    this.router.navigateByUrl(url);
  }

  goToPhotoDetail(id: number, albumId: number): void {
    const url = `/photos/photo-detail?id=${id}&albumId=${albumId}`;
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
    this.albumService.getAlbumns(params).subscribe(
      (albums: Album[]) => {
        this.albums = albums;
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
        this.posts = posts;
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
