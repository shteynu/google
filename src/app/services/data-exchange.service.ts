import {Injectable} from '@angular/core';
import {SearchModel} from '../model/searchModel';
import {Observable, Subject, Subscribable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PAGE_SIZE} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  // tslint:disable-next-line:variable-name
  private _userName: string;
  private url: string;
  public allItems: Array<any>;
  private displayPopUp: Subject<boolean> = new Subject<boolean>();
  private myWishList: Array<any>;

  constructor(private http: HttpClient) {
    this.url = 'https://www.googleapis.com/books/v1/volumes?q=';
  }

  public getDisplayPopUp(): Subscribable<boolean> {
    return this.displayPopUp;
  }

  public setDisplayPopUp(value: boolean): void {
    this.displayPopUp.next(value);
  }


  public getMyWithList(): [] {
    return JSON.parse(localStorage.getItem(this.userName + '_wishList'));
  }

  public setMyWishList(wishList: any []): void {
    console.log(this.userName);
    localStorage.setItem(this.userName + '_wishList', JSON.stringify(wishList));
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  getBooks(query: SearchModel): Observable<[]> {
    const request = `${this.url}${query.text}+intitle:${query.title}+inauthor:${query.author}&maxResults=${PAGE_SIZE}`;
    console.log(request);
    return this.http.get(request).pipe(
      map((response: {items: []}) => response.items || null),
      tap(value => this.allItems = value),
      catchError((error) => throwError(error.error || error))
    );
  }




}
