import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    PhotosListComponent,
    PhotoDetailComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class PhotosModule { }
