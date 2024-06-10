import { Component } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { BagService } from '../services/bag.service';

interface Breadcrumb {
  label: string;
  url: string;
}

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

  // bagItems: any[] = [];
  // private bagItemSubscription: Subscription | undefined;

  // constructor(
  //   private bagService: BagObservableService
  // ) {
    
  // }

  // ngOnInit(): void {
  //   this.bagItems = this.bagService.getBagItems();
  //   this.bagItemSubscription = this.bagService.bagItems$.subscribe((items: any) => {
  //     return this.bagItems = items;
  //   })
  // }

  // ngOnDestroy(): void {
  //   this.bagItemSubscription?.unsubscribe();
  // }

  // removeItem(item: any) {
  //   this.bagService.removeBagItem(item);
  // }
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    });
  }

  goToUserDetail(id: number): void {
    const url = `/user?id=${id}`;
    this.router.navigateByUrl(url);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
