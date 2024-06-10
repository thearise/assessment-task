import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDetailService } from '../../services/posts/post-detail.service';
import { Post } from '../../services/posts/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: Post | undefined | null; // definite assignment assertion
  error: string = ''; // Initializing error variable
  idParam: any = null;

  constructor(
    private route: ActivatedRoute,
    private postDetailService: PostDetailService
  ) { }

  ngOnInit(): void {
    this.getPostDetail();
  }

  getPostDetail(): void {
    this.idParam = this.route.snapshot.queryParamMap.get('id');
    console.log('param: ' + JSON.stringify(this.idParam));
    if (this.idParam !== null) {
      const id = +this.idParam;
      this.postDetailService.getPostById(id)
        .subscribe(
          post => {
            this.post = post;
            this.error = ''; // Reset error if successful
          },
          error => {
            this.error = error;
            this.post = null;
          }
        );
    } else {
      this.error = 'No post ID provided.';
      this.post = null;
    }
  }
}
