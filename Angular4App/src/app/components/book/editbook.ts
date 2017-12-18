import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';


import { CustomerModel } from '../../models/customer.model'
import 'rxjs/add/operator/map'
import { AppSettings } from '../../constants/appsettings';
import { BookModel } from "../../models/bookmodel";

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './editbook.html'
})
export class EditBooksComponent implements OnInit {

  constructor(private _httpService: Http, private route: ActivatedRoute) { }

  private title: string = "";
  private id: number;
  private sub: any;
  private book: BookModel = new BookModel();
  private isEdit: boolean = true;

  private myForm: FormGroup;


  ngOnInit() {
    this.myForm = new FormGroup({
      'name': new FormControl(),
      'author': new FormControl(),//,
      'pages': new FormControl(),
      'dateofpublication': new FormControl()
      //'location': new FormGroup({
      //    'country': new FormControl(),
      //    'city': new FormControl()
      //}),
      //'phoneNumbers': new FormArray([new FormControl('')])
    });

    this.sub = this.route.params.subscribe(params => {
      if (!params['id']) {
        this.isEdit = false;
        this.title = "Add Book";
      }
      else {
        this.id = +params['id'];
        this.title = "Edit Book";
      }
    });

    if (this.isEdit) {
      var url = AppSettings.API_ENDPOINT + "/customer/GetCustomer/" + this.id;
      this._httpService.get(url).subscribe(values => {
        this.book = values.json() as BookModel;
      });
    }
  }

  addOrUpdate(): void {
    let url = "";
    if (this.isEdit) { url = AppSettings.API_ENDPOINT + "/customer/UpdateCustomer"; }
    else { url = AppSettings.API_ENDPOINT + "/customer/AddCustomer"; }
    this.add(url, this.book).subscribe(values => {
      window.location.href = "/books";
    });
    //this._httpService.post(url, JSON.stringify(this.customer), this.addHeaders()).subscribe(values => {
    //  //window.location.href = "/customers";
    //});
  }

  add(url: string, book: BookModel) {
    return this._httpService.post(url, JSON.stringify(book), this.addHeaders())
      .map((response: any) => {
        return response;
      });
  }

  addHeaders() {
    let headers = new Headers();
    let params = new URLSearchParams();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params: params });
    return options;
  }

  cancelUpdate(): void {
    window.location.href = "/books";
  }
}
