import { Component } from '@angular/core';
import { BagObservableService } from '../services/bag-observable.service';
import { Subscription } from 'rxjs';
// import { BagService } from '../services/bag.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  // bagItems: any[] = [];

  // constructor(
  //   private bagService: BagService
  // ) {
  //   this.bagItems = this.bagService.getBagItem();
  // }

  // removeBagItem(item: any) {
  //   this.bagService.removeBagItem(item);
  //   this.bagItems = this.bagService.getBagItem();
  // }

  bagItems: any[] = [];
  private bagItemSubscription: Subscription | undefined;

  constructor(
    private bagService: BagObservableService
  ) {
    
  }

  ngOnInit(): void {
    this.bagItems = this.bagService.getBagItems();
    this.bagItemSubscription = this.bagService.bagItems$.subscribe((items: any) => {
      return this.bagItems = items;
    })
  }

  ngOnDestroy(): void {
    this.bagItemSubscription?.unsubscribe();
  }

  removeItem(item: any) {
    this.bagService.removeBagItem(item);
  }
}
