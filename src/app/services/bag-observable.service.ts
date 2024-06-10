import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class BagObservableService {
    private bagItemsSubject = new BehaviorSubject<any[]>([]);
    bagItems$ = this.bagItemsSubject.asObservable();

    addItem(item: any) {
        const currentItems = this.bagItemsSubject.getValue();
        currentItems.push(item);
        this.bagItemsSubject.next(currentItems);
    }

    getBagItems() {
        return this.bagItemsSubject.getValue();
    }

    removeBagItem(saleItem: any) {
        const currentItems = this.bagItemsSubject.getValue();
        this.bagItemsSubject.next(currentItems.filter(item => item.id !== saleItem.id));
    }

}