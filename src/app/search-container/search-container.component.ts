import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataExchangeService} from '../services/data-exchange.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SearchModel} from '../model/searchModel';
import {BookModel} from '../model/bookModel';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchContainerComponent implements OnInit, AfterViewInit {

  userName: string;
  searchForm: FormGroup;
  books$: Observable<BookModel[]>;
  bookId: string;

  constructor(private router: Router,
              private dataService: DataExchangeService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userName = this.dataService.userName;
    this.searchForm = this.formBuilder.group(
      {
        text: [''],
        author: [''],
        title: ['']
      }
    );
    this.books$ = this.loadBooks({text: '', author: '', title: ''});
  }

  ngAfterViewInit(): void {
    this.books$ = this.searchForm.valueChanges.pipe(
      debounceTime(400),
      tap(val => console.log(val)),
      switchMap((value: SearchModel) => this.loadBooks(value)),
    );
  }

  loadBooks(search: SearchModel): Observable<BookModel[]>{
    return this.dataService.getBooks(search).pipe(
      tap( response => console.log(response)),
      map((response: any) => {
        return response && response.map(value => {
          return {id: value.id, ...value.volumeInfo};
        });
      }),
    );

}

  onRowClick(event: MouseEvent, bookId: string): void {
    console.log(event);
    this.dataService.setDisplayPopUp(true);
    this.bookId = bookId;
  }

  openWishList(event: any): void {
    this.router.navigate(['wishlist']);
  }
}
