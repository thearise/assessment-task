// services/posts/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private http: HttpClient) {}

  getPosts(params: any): Observable<Post[]> {
    // You can modify this method to include query parameters
    // based on the provided params object
    return this.http.get<Post[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    // Handle error here, for example, log it or display a user-friendly message
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError('Something went wrong. Please try again later.');
  }
}
