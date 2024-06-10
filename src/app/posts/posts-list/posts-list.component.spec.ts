import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListComponent } from './posts-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/posts/post.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let postService: jest.Mocked<PostService>;
  let paginationService: PaginationService;
  let router: Router;

  beforeEach(async () => {
    const postServiceMock = {
      getPosts: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PostsListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: PostService, useValue: postServiceMock },
        PaginationService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ page: '1', search: '', sort: 'id' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jest.Mocked<PostService>;
    paginationService = TestBed.inject(PaginationService);
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

  it('should fetch posts on init', () => {
    const mockPosts = [{ id: 1, title: 'Post 1', body: 'Body 1', userId: 1 }];
    postService.getPosts.mockReturnValue(of(mockPosts));

    component.ngOnInit();

    // Simulate the queryParams subscription triggering fetchPosts
    fixture.whenStable().then(() => {
      expect(component.loading).toBe(true);
      expect(postService.getPosts).toHaveBeenCalled();
    });
  });

  it('should handle error while fetching posts', () => {
    postService.getPosts.mockReturnValue(throwError('error'));

    component.ngOnInit();

    expect(component.loading).toBe(false);
    expect(component.error).toBe('An error occurred while fetching posts.');
  });

  it('should filter posts based on search query', () => {
    component.posts = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
      { id: 2, title: 'Another Post', body: 'Another Body', userId: 2 }
    ];
    component.searchQuery = 'another';
    component.filterPosts();

    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].title).toBe('Another Post');
  });

  it('should sort posts by title', () => {
    component.posts = [
      { id: 2, title: 'B Post', body: 'Body 1', userId: 1 },
      { id: 1, title: 'A Post', body: 'Body 2', userId: 2 }
    ];
    component.sortBy = 'title';
    component.filterPosts(); // Ensure filteredPosts is set and sorted
  
    expect(component.filteredPosts[0].title).toBe('A Post');
    expect(component.filteredPosts[1].title).toBe('B Post');
  });
  

  it('should update sort order and navigate on sort change', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    const event = { target: { value: 'title' } };
    component.onSortChange(event);

    expect(component.sortBy).toBe('title');
    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: component.getTestRoute(),
      queryParams: { sort: 'title', page: 1 },
      queryParamsHandling: 'merge'
    });
  });

  it('should update search query and navigate on search', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.searchQuery = 'test';
    component.onSearch();

    expect(component.currentPage).toBe(1);
    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: component.getTestRoute(),
      queryParams: { search: 'test', page: 1 },
      queryParamsHandling: 'merge'
    });
  });

  it('should update current page and navigate on page change', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: component.getTestRoute(),
      queryParams: { page: 2 },
      queryParamsHandling: 'merge'
    });
  });

  it('should navigate to post detail', () => {
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
    const postId = 1;
    const expectedUrl = `/posts/post-detail?id=${postId}`;
    
    component.goToPostDetail(postId);
    
    expect(navigateByUrlSpy).toHaveBeenCalledWith(expectedUrl);
  });

  it('should return paginated posts', () => {
    component.filteredPosts = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}`, body: `Body ${i + 1}`, userId: i + 1 }));
    component.currentPage = 2;
    component.postsPerPage = 10;

    const paginatedPosts = component.getPaginatedPosts();
    
    expect(paginatedPosts.length).toBe(10);
    expect(paginatedPosts[0].id).toBe(11);
    expect(paginatedPosts[9].id).toBe(20);
  });

  it('should calculate total pages correctly', () => {
    component.filteredPosts = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, title: `Post ${i + 1}`, body: `Body ${i + 1}`, userId: i + 1 }));
    component.postsPerPage = 10;

    const totalPages = component.getTotalPages();
    
    expect(totalPages).toBe(3);
  });
});
