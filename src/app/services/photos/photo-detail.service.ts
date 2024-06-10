import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Photo } from './photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoDetailService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos/';

  constructor(
    private http: HttpClient
  ) { }

  getPhotoById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Photo>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    console.log('An error occured: ', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
