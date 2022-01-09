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

const appRoutes: Routes = [
  { path: '', component: UserComponent},
  { path: 'user', component: UserComponent},
  { path: 'search', component: SearchContainerComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];



@NgModule({
  declarations: [
    AppComponent,
    SearchContainerComponent,
    UserComponent
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
      RouterModule.forRoot(appRoutes)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
