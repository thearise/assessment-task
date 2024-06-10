import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PhotosListComponent,
    PhotoDetailComponent,

  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    FormsModule
  ]
})
export class PhotosModule { }
