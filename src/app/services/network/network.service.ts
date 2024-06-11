import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get<T>(url, { params: httpParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  post<T>(url: string, body: any, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.post<T>(url, body, { params: httpParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Error) {
    // Handle error here, for example, log it or display a user-friendly message
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError('Something went wrong. Please try again later.');
  }
}
