import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { CustomerModel } from '../../models/customer.model';
import { AppSettings } from '../../constants/appsettings';
import { BookModel } from "../../models/bookmodel";

@Component({
    selector: 'app-root',
    templateUrl: './book.html',
    styleUrls: ['./book.css']
})
export class BooksComponent implements OnInit {

    constructor(private _httpService: Http) { }

    private books: BookModel[];

    ngOnInit() {
      this._httpService.get(AppSettings.API_ENDPOINT + '/customer/GetCustomers').subscribe(values => {
            this.books = values.json() as BookModel[];
        });
    }

    private delete(id: number): void {
        var isConfirm = confirm("Are you sure?");

        if (isConfirm) {
          this._httpService.post(AppSettings.API_ENDPOINT + '/customer/DeleteCustomer/' + id, {}).subscribe(values => {
              let index = this.books.findIndex(x => x.id === id); //find index in your array
                this.books.splice(index, 1);//remove element from array
            });
        }
    }
}
