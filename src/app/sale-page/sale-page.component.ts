import { Component } from '@angular/core';
import { BagObservableService } from '../services/bag-observable.service';
// import { BagService } from '../services/bag.service';

@Component({
  selector: 'app-sale-page',
  templateUrl: './sale-page.component.html',
  styleUrls: ['./sale-page.component.css']
})
export class SalePageComponent {
  saleItems = [
    {
      'id': '1',
      'name': 'Bag1',
      'price': 1000,
      'brand': 'Uniqlo',
      'images': [
        'assets/images/demo/product-listing-1.jpg',
        'assets/images/demo/product-listing-1-1.jpg'
      ]
    },
    {
      'id': '2',
      'name': 'Bag2',
      'price': 1000,
      'brand': 'Uniqlo2',
      'images': [
        'assets/images/demo/product-listing-2.jpg',
        'assets/images/demo/product-listing-2-1.jpg'
      ]
    },
    {
      'id': '3',
      'name': 'Bag3',
      'price': 1000,
      'brand': 'Uniqlo3',
      'images': [
        'assets/images/demo/product-listing-3.jpg',
        'assets/images/demo/product-listing-3-1.jpg'
      ]
    }
  ]
  constructor(
    private bagService: BagObservableService
  ) {

  }

  addItemToBag(item: any) {
    this.bagService.addItem(item);
  }
}
