import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { SalePageComponent } from './sale-page/sale-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MenuBarComponent,
    FooterPageComponent,
    TestPageComponent,
    SalePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
