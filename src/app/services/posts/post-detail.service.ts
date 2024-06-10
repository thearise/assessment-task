// src/app/services/post-detail/post-detail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private http: HttpClient) { }

  getPostById(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong while fetching post details.');
      })
    );
  }
}
