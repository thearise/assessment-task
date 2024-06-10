import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoDetailService } from 'src/app/services/photos/photo-detail.service';
import { Photo } from 'src/app/services/photos/photo.model';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrl: './photo-detail.component.css'
})
export class PhotoDetailComponent {
  photo!: Photo | undefined | null; // definite assignment assertion
  error: string = ''; // Initializing error variable
  idParam: any = null;
  albumIdParam: any = null;

  constructor(
    private route: ActivatedRoute,
    private photoDetailService: PhotoDetailService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPostDetail();
  }

  getPostDetail(): void {
    this.idParam = this.route.snapshot.queryParamMap.get('id');
    this.albumIdParam = this.route.snapshot.queryParamMap.get('albumId');
    console.log('param: ' + JSON.stringify(this.idParam));
    if (this.idParam !== null) {
      const id = +this.idParam;
      this.photoDetailService.getPhotoById(id)
        .subscribe(
          photo => {
            this.photo = photo;
            this.error = ''; // Reset error if successful
          },
          error => {
            this.error = error;
            this.photo = null;
          }
        );
    } else {
      this.error = 'No post ID provided.';
      this.photo = null;
    }
  }

  goToAlbumPage() {
    const url = `/albums/album-detail?id=${this.albumIdParam}`;
    this.router.navigateByUrl(url);
  }
}
