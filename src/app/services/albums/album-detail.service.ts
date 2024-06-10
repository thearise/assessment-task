import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumDetailService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums/';

  constructor(
    private http: HttpClient
  ) { }

  getAlbumById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Album>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    console.log('An error occured: ', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
