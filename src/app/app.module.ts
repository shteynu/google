import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchContainerComponent} from './search-container/search-container.component';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ConfirmationService, MessageService, SharedModule} from 'primeng/api';
import { DetailsDialogBoxComponent } from './details-dialog-box/details-dialog-box.component';
import {DialogModule} from 'primeng/dialog';
import { WishlistContainerComponent } from './wishlist-container/wishlist-container.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ActivateGuard} from './activate.guard';

const appRoutes: Routes = [
  { path: '', component: UserComponent},
  { path: 'user', component: UserComponent, canActivate: [ActivateGuard]},
  { path: 'search', component: SearchContainerComponent, canActivate: [ActivateGuard]},
  { path: 'wishlist', component: WishlistContainerComponent, canActivate: [ActivateGuard]},
  { path: '**', redirectTo: '/'}
];



@NgModule({
  declarations: [
    AppComponent,
    SearchContainerComponent,
    UserComponent,
    DetailsDialogBoxComponent,
    WishlistContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TableModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
