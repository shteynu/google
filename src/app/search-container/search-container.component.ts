import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataExchangeService} from '../services/data-exchange.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
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
  books: any;

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
  }

  ngAfterViewInit(): void {
    this.searchForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(val => console.log(val)),
      switchMap((value: SearchModel) => this.loadBooks(value)),
    ).subscribe();

  }

  loadBooks(search: SearchModel): Observable<BookModel>{
    return this.dataService.getBooks(search).pipe(
      tap(response => console.log(response)),
      map((response: any) => response && response.volumeInfo || null),
    );

}

}
