import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class BagService {
    private bagItems: any[] = [];

    constructor() {}
    
    addItem(item: any) {
        this.bagItems.push(item);
    }

    getBagItem() {
        return this.bagItems;
    }

    removeBagItem(item: any) {
        console.log('removing item: ' + JSON.stringify(item));
        this.bagItems = this.bagItems.filter((itm: any) => {
            return itm.id != item.id;
        });
    }
}