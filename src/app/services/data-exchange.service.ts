import {Injectable} from '@angular/core';
import {SearchModel} from '../model/searchModel';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  // tslint:disable-next-line:variable-name
  private _userName: string;
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://www.googleapis.com/books/v1/volumes?q=';
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  getBooks(query: SearchModel): Observable<[]> {
    const request = `${this.url}${query.text}+intitle:${query.title}+inauthor:${query.author}`;
    console.log(request);
    return this.http.get(request).pipe(
      map((response: {items: []}) => response.items || null),
      catchError((error) => throwError(error.error || error))
    );
  }




}
