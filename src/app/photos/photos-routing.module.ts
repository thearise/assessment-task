import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';

const routes: Routes = [
  { path: '', component: PhotosListComponent },
  { path: 'photos-list', component: PhotosListComponent },
  { path: 'photo-detail', component: PhotoDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
