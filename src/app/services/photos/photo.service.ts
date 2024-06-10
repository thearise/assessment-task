import { Injectable } from '@angular/core';
import { Photo } from './photo.model';
import { Observable } from 'rxjs';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = "https://jsonplaceholder.typicode.com/photos";

  constructor(private networkService: NetworkService) {}

  getPhotos(): Observable<Photo[]> {
    return this.networkService.get<Photo[]>(this.apiUrl);
  }
}
