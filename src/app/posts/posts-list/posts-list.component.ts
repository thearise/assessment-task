import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../services/posts/post.model';
import { PostService } from '../../services/posts/post.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { SortBy } from 'src/app/services/sortby/sortby.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  loading: boolean = false;
  error: string = '';
  currentPage: number = 1;
  postsPerPage: number = 10;
  searchQuery: string = '';
  sortBy: string = 'id';
  sortByList: SortBy[] = [
    {sort: 'id', display: 'Sort By ID'},
    {sort: 'title', display: 'Sort By Title'},
    {sort: 'userId', display: 'Sort By User'},
    {sort: 'body', display: 'Sort By Body'}
  ]

  constructor(
    private postService: PostService,
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
      this.fetchPosts(params);
    });
  }

  goToPostDetail(id: number): void {
    const url = `/posts/post-detail?id=${id}`;
    this.router.navigateByUrl(url);
  }

  fetchPosts(params: any): void {
    this.loading = true;
    this.error = '';
    this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts;
        this.filterPosts();
        this.loading = false;
      },
      error => {
        this.error = 'An error occurred while fetching posts. ' + error;
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

  filterPosts(): void {
    if (this.searchQuery) {
      this.filteredPosts = this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredPosts = this.posts;
    }
    this.sortPosts();
  }

  sortPosts(): void {
    this.filteredPosts.sort((a, b) => {
      if (this.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (this.sortBy === 'body') {
        return a.body.localeCompare(b.body);
      } else if (this.sortBy === 'userId') {
        return a.userId - b.userId;
      } else {
        return a.id - b.id;
      }
    });
  }

  onSearch(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.currentPage = 1;
    this.filterPosts();
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

  getPaginatedPosts(): Post[] {
    return this.paginationService.getPaginatedItems(this.filteredPosts, this.currentPage, this.postsPerPage);
  }

  getTotalPages(): number {
    return this.paginationService.getTotalPages(this.filteredPosts, this.postsPerPage);
  }

  getPageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    return this.paginationService.calculatePaginationRange(this.currentPage, totalPages);
  }


  // Helper method for tests
  /* @if TEST */
  getTestRoute(): ActivatedRoute {
    return this.route;
  }
  /* @endif */
}
