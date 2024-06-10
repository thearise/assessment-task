import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = "https://jsonplaceholder.typicode.com/albums/";

  constructor(
    private http: HttpClient
  ) {
  }

  getAlbumns(params: any) {
    return this.http.get<Album[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    // Handle error here, for example, log it or display a user-friendly message
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError('Something went wrong. Please try again later.');
  }
}
