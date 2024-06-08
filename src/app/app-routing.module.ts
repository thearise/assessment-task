import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { SalePageComponent } from './sale-page/sale-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  // {path: 'test', component: TestPageComponent},
  {path: 'sale', component: SalePageComponent},
  { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
  // { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
