import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { catchError, throwError } from 'rxjs';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = "https://jsonplaceholder.typicode.com/albums/";

  constructor(
    private http: HttpClient,
    private networkService: NetworkService,
  ) {
  }

  getAlbumns() {
    return this.networkService.get<Album[]>(this.apiUrl);
  }
}
