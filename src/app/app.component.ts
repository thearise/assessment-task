import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, switchMap, timer, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = false;

  // constructor(private router: Router) {
  //   this.router.events
  //     .pipe(
  //       filter((event: any) => event instanceof NavigationStart || event instanceof NavigationEnd),
  //       switchMap((event: Event) => {
  //         if (event instanceof NavigationStart) {
  //           this.loading = true;
  //           return timer(1000); // Introduce a 300ms delay
  //         } else if (event instanceof NavigationEnd) {
  //           return timer(0).pipe(tap(() => this.loading = false));
  //         } else {
  //           return [];
  //         }
  //       })
  //     )
  //     .subscribe();
  // }
}
