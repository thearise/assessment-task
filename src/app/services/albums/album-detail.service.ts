import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { Observable, catchError, throwError } from 'rxjs';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumDetailService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums/';

  constructor(
    private http: HttpClient,
    private networkService: NetworkService
  ) { }

  getAlbumById(id: number): Observable<Album> {
    const url = `${this.apiUrl}/${id}`;
    return this.networkService.get<Album>(url);
  }
}
