import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/error/not-found';
import { EditBooksComponent } from './components/book/editbook';
import { BooksComponent } from './components/book/book';
import { BooksDetailComponent } from './components/book/bookdetail';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Ng2OrderModule } from 'ng2-order-pipe';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';
import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module';

const appRoutes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'addbook', component: EditBooksComponent },
  { path: 'books', component: BooksComponent },
  { path: 'editBook/:id', component: EditBooksComponent },
  { path: 'detailBook/:id', component: BooksDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    EditBooksComponent,
    BooksComponent,
    BooksDetailComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularMultiSelectModule,
    MyDatePickerModule,
    HttpModule,
    RouterModule.forRoot(appRoutes//,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    NgxPaginationModule,
    Ng2OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
