import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Photo } from './photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = "https://jsonplaceholder.typicode.com/photos/";

  constructor(
    private http: HttpClient
  ) {
  }

  getPhotos(params: any) {
    return this.http.get<Photo[]>(this.apiUrl)
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
