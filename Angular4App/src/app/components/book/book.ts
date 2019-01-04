import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

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
  dropdownList: any;
  selectedItems: any;
  dropdownSettings: any;

  onItemSelect(item): any {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item): any {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items): any {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
    ngOnInit() {
        this.getBooks();
    }
   
    private delete(id: number): void {
        var isConfirm = confirm("Are you sure?");

        if (isConfirm) {
          this._httpService.post(AppSettings.API_ENDPOINT + '/book/DeleteBook/' + id, {}).subscribe(values => {
              let index = this.books.findIndex(x => x.id === id); //find index in your array
                this.books.splice(index, 1);//remove element from array
            });
        }
    }
      //Pagination: initializing p to one
    p: number = 1;
    total: number = 0;
    itemPerPage: number = 5;
    pageChanged($event): void {
        this.p = $event;
        this.getBooks()
    }
    key: string = 'name'; //set default
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
    getBooks() {
        var dataToPost = JSON.stringify({ pageNumber: this.p, itemsPerPage: this.itemPerPage });
        this._httpService.post(AppSettings.API_ENDPOINT + '/book/GetBooks', dataToPost, this.addHeaders()).subscribe(values => {
            var data = values.json();
            this.books = data.Data;
          this.total = data.Total;
          console.log(this.books)
        });
    }

    addHeaders() {
        let headers = new Headers();
        let params = new URLSearchParams();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, params: params });
        return options;
    }
}
