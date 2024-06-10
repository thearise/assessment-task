// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { 
//     path: 'admin', 
//     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
//     // path: 'sales',
//     // loadComponent: () => import('./sale-page/sale-page.component').then(c => c.SalePageComponent)
//   },
//   {
//     path: 'posts',
//     loadChildren: () => import('./posts-list/posts-list.module').then(m => m.PostsListModule)
//   },
//   {
//     path: 'posts/posts-list',
//     loadChildren: () => import('./posts-list/posts-list.module').then(m => m.PostsListModule)
//   },
//   { path: 'posts/post-detail', loadChildren: () => import('./post-detail/post-detail.module').then(m => m.PostDetailModule) }
//   // Other routes if any
// ];

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: 'albums',
    loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule)
  },
  {
    path: 'photos',
    loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }