import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { FormsModule } from '@angular/forms';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumPhotoComponent } from './album-photo/album-photo.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    AlbumsListComponent,
    AlbumDetailComponent,
    AlbumPhotoComponent,
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    FormsModule,
    SharedComponentsModule
  ],
  exports: [
    AlbumsListComponent
  ]
})
export class AlbumsModule { }
