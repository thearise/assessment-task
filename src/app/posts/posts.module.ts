// src/app/posts/posts.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsRoutingModule } from './posts-routing.module';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsTableComponent } from '../shared-components/posts-table/posts-table.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    PostsListComponent,
    BreadcrumbComponent,
    PostDetailComponent,
    PostsTableComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    RouterModule,
    FormsModule,
    SharedComponentsModule
  ],
  exports: [
    PostsListComponent,
    PostDetailComponent,
  ]
})
export class PostsModule { }
