import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../services/posts/post.model';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent {
  @Input() posts: Post[] = [];
  @Input() loading: boolean = false;
  @Output() postClicked = new EventEmitter<number>();

  onPostClick(postId: number): void {
    this.postClicked.emit(postId);
  }
}
