import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Photo } from './photo.model';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoDetailService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos/';

  constructor(
    private http: HttpClient,
    private networkService: NetworkService,
  ) { }

  getPhotoById(id: number): Observable<Photo> {
    const url = `${this.apiUrl}/${id}`;
    return this.networkService.get<Photo>(url);
  }
}
