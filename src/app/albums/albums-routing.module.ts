import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumPhotoComponent } from './album-photo/album-photo.component';

const routes: Routes = [
  { path: '', component: AlbumsListComponent},
  { path: 'album-detail', component: AlbumDetailComponent},
  { path: 'photo-detail', component: AlbumPhotoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
