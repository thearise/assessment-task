// services/posts/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(
    private http: HttpClient,
    private networkService: NetworkService,
  ) {}

  getPosts(): Observable<Post[]> {
    return this.networkService.get<Post[]>(this.apiUrl);
  }
}
