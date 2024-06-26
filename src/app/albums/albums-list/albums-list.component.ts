import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '../../services/albums/album.model';
import { AlbumService } from '../../services/albums/album.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { Photo } from '../../services/photos/photo.model';
import { PhotoService } from '../../services/photos/photo.service';
import { SortBy } from 'src/app/services/sortby/sortby.model';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrl: './albums-list.component.css'
})
export class AlbumsListComponent {
  albums: Album[] = [];
  photos: Photo[] = [];
  filteredAlbumList: Album[] = [];
  loading: boolean = false;
  loadingPhotos: boolean = false;
  error: string = '';
  errorPhoto: string = '';
  currentPage: number = 1;
  postsPerPage: number = 15;
  searchQuery: string = '';
  sortBy: string = 'id';

  sortByList: SortBy[] = [
    {sort: 'id', display: 'Sort By ID'},
    {sort: 'title', display: 'Sort By Title'}
  ]

  images = [
    { name: 'David Whittaker' },
    { name: 'Masimba Sibanda' },
    { name: 'Krishna Bajaj' },
    { name: 'Harry Xai' },
    { name: 'David Whittaker' },
  ];

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private paginationService: PaginationService,
    private photoService: PhotoService,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = parseInt(params['page'], 10) || 1;
      const search = params['search'] || '';
      const sort = params['sort'] || 'id';
      this.currentPage = page;
      this.searchQuery = search;
      this.sortBy = sort;
      this.fetchAlbums();
      this.fetchPhotos();
    })
  }

  getRelatedPhotos(albumId: number): Photo[] {
    let photos = this.photos.filter((photo: Photo) => {
      return photo.albumId == albumId;
    });
    photos = photos.slice(0, 5);
    return photos;
  }

  fetchPhotos() {
    this.loadingPhotos = true;
    this.error = '';
    this.photoService.getPhotos().subscribe(
      photos => {
        this.photos = photos
        this.loadingPhotos = false;
      },
      error => {
        this.errorPhoto = "An error occurred while fetching photos. " + error;
        this.loadingPhotos = false;
      }
    )
  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateRandomQuery(): string {
    return Math.random().toString(36).substring(7);
  }

  onSortChange(event: any): void {
    this.sortBy = event.target.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: this.sortBy || null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  goToAlbumDetail(id: number): void {
    const url = `/albums/album-detail?id=${id}`;
    this.router.navigateByUrl(url);
  }

  fetchAlbums() {
    this.loading = true;
    this.error = '';
    this.albumService.getAlbumns().subscribe(
      albums => {
        this.albums = albums
        this.filteredAlbums();
        this.loading = false;
      },
      error => {
        this.error = "An error occurred while fetching albums. " + error;
        this.loading = false;
      }
    )
  }

  filteredAlbums(): void {
    if(this.searchQuery) {
      this.filteredAlbumList = this.albums.filter(album => {
        return album.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredAlbumList = this.albums;
    }
    this.sortAlbums();
  }

  sortAlbums() {
    this.filteredAlbumList.sort((a, b) => {
      if(this.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if(this.sortBy === 'userId') {
        return a.userId - b.userId;
      } else {
        return a.id - b.id;
      }
    });
  }

  onSearch(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.currentPage = 1;
    this.filteredAlbums();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchQuery || null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  calculateIndex(index: number): number {
    return (this.currentPage - 1) * this.postsPerPage + index + 1;
  }

  onPageChange(pageNumber: any): void {
    this.currentPage = pageNumber;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: pageNumber },
      queryParamsHandling: 'merge'
    });
  }

  getPaginatedPosts(): Album[] {
    return this.paginationService.getPaginatedItems(this.filteredAlbumList, this.currentPage, this.postsPerPage);
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.filteredAlbumList, this.postsPerPage);
  }

  getPageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    return this.paginationService.calculatePaginationRange(this.currentPage, totalPages);
  }
}
