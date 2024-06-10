import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlbumDetailService } from '../../services/albums/album-detail.service';
import { Album } from '../../services/albums/album.model';
import { PaginationService } from '../../services/pagination/pagination.service';
import { Photo } from '../../services/photos/photo.model';
import { PhotoService } from '../../services/photos/photo.service';
import { SortBy } from 'src/app/services/sortby/sortby.model';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent {
  album!: Album | undefined | null; // definite assignment assertion
  error: string = ''; // Initializing error variable
  idParam: any = null;

  photos: Photo[] = [];
  filteredPhotoList: Photo[] = [];
  loading: boolean = false;
  errorPhoto: string = '';
  currentPage: number = 1;
  postsPerPage: number = 15;
  searchQuery: string = '';
  sortBy: string = 'id';
  sortByList: SortBy[] = [
    {sort: 'id', display: 'Sort By ID'},
    {sort: 'title', display: 'Sort By Title'}
  ]

  constructor(
    private route: ActivatedRoute,
    private albumDetailService: AlbumDetailService,
    private router: Router,
    private photoService: PhotoService,
    private paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.getAlbumDetail();
    this.route.queryParams.subscribe(params => {
      const page = parseInt(params['page'], 10) || 1;
      const search = params['search'] || '';
      const sort = params['sort'] || 'id';
      this.currentPage = page;
      this.searchQuery = search;
      this.sortBy = sort;
      this.fetchPhotos(params);
    })
  }

  getAlbumDetail(): void {
    this.idParam = this.route.snapshot.queryParamMap.get('id');
    console.log('param: ' + JSON.stringify(this.idParam));
    if (this.idParam !== null) {
      const id = +this.idParam;
      this.albumDetailService.getAlbumById(id)
        .subscribe(
          album => {
            this.album = album;
            this.error = ''; // Reset error if successful
          },
          error => {
            this.error = error;
            this.album = null;
          }
        );
    } else {
      this.error = 'No album ID provided.';
      this.album = null;
    }
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

  fetchPhotos(params: Params) {
    this.loading = true;
    this.error = '';
    this.photoService.getPhotos().subscribe(
      photos => {
        this.photos = photos.filter((photo: Photo) => {
          return photo.albumId == this.idParam;
        })
        this.filteredPhotos();
        this.loading = false;
      },
      error => {
        this.error = "An error occurred while fetching albums.";
        this.loading = false;
      }
    )
  }

  filteredPhotos(): void {
    if(this.searchQuery) {
      this.filteredPhotoList = this.photos.filter(photo => {
        return photo.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredPhotoList = this.photos;
    }
    this.sortPhotos();
  }

  sortPhotos() {
    this.filteredPhotoList.sort((a, b) => {
      if(this.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return a.id - b.id;
      }
    });
  }

  onSearch(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.currentPage = 1;
    this.filteredPhotos();
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

  goToPhotoDetail(id: number, albumId: number): void {
    const url = `/albums/photo-detail?id=${id}&albumId=${albumId}`;
    this.router.navigateByUrl(url);
  }

  getPaginatedPhotos(): Photo[] {
    return this.paginationService.getPaginatedItems(this.filteredPhotoList, this.currentPage, this.postsPerPage);
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.filteredPhotoList, this.postsPerPage);
  }

  getPageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    return this.paginationService.calculatePaginationRange(this.currentPage, totalPages);
  }
}
