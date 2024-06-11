// src/app/services/post-detail/post-detail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../posts/post.model';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(
    private http: HttpClient,
    private networkService: NetworkService,
  ) { }

  getPostById(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.networkService.get<Post>(url);
  }
}
