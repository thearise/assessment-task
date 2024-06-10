import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { Photo } from './photo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoDetailService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos/';

  constructor(private networkService: NetworkService) {}

  getPhotoById(id: number): Observable<Photo> {
    const url = `${this.apiUrl}/${id}`;
    return this.networkService.get<Photo>(url);
  }
}
