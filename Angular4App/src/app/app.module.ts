import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/error/not-found';
import { EditBooksComponent } from './components/book/editbook';
import { BooksComponent } from './components/book/book';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'addbook', component: EditBooksComponent },
    { path: 'books', component: BooksComponent },
    { path: 'editBook/:id', component: EditBooksComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        EditBooksComponent,
        BooksComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes//,
            //{ enableTracing: true } // <-- debugging purposes only
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
