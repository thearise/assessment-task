import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from '../../services/pagination/pagination.service';
import { Photo } from '../../services/photos/photo.model';
import { PhotoService } from '../../services/photos/photo.service';
import { SortBy } from 'src/app/services/sortby/sortby.model';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.css'
})
export class PhotosListComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotosList: Photo[] = [];
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  postsPerPage: number = 15;
  searchQuery: string = '';
  sortBy: string = 'id';
  sortByList: SortBy[] = [
    {sort: 'id', display: 'Sort By ID'},
    {sort: 'title', display: 'Sort By Title'}
  ]

  constructor(
    private photoService: PhotoService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = parseInt(params['page'], 10) || 1; // Get current page from query params, default to 1
      const search = params['search'] || '';
      const sort = params['sort'] || 'id';
      this.currentPage = page;
      this.searchQuery = search;
      this.sortBy = sort;
      this.fetchPhotos();
    });
  }

  goToPhotoDetail(id: number, albumId: number): void {
    const url = `/photos/photo-detail?id=${id}&albumId=${albumId}`;
    this.router.navigateByUrl(url);
  }

  fetchPhotos(): void {
    this.loading = true;
    this.error = '';
    this.photoService.getPhotos().subscribe(
      photos => {
        this.photos = photos;
        this.filterPhotos();
        this.loading = false;
      },
      error => {
        this.error = 'An error occurred while fetching photos. ' + error;
        this.loading = false;
      }
    );
  }

  onSortChange(event: any): void {
    this.sortBy = event.target.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: this.sortBy || null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  filterPhotos(): void {
    if (this.searchQuery) {
      this.filteredPhotosList = this.photos.filter(photo =>
        photo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPhotosList = this.photos;
    }
    this.sortPosts();
  }

  sortPosts(): void {
    this.filteredPhotosList.sort((a, b) => {
      if (this.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return a.id - b.id;
      }
    });
  }

  onSearch(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.currentPage = 1;
    this.filterPhotos();
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

  getPaginatedPhotos(): Photo[] {
    return this.paginationService.getPaginatedItems(this.filteredPhotosList, this.currentPage, this.postsPerPage);
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.filteredPhotosList, this.postsPerPage);
  }

  getPageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    return this.paginationService.calculatePaginationRange(this.currentPage, totalPages);
  }
}
