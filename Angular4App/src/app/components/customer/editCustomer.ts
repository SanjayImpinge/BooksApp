import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';


import { CustomerModel } from '../../models/customer.model'
import 'rxjs/add/operator/map'
import { AppSettings } from '../../constants/appsettings';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './editCustomer.html'
})
export class EditCustomersComponent implements OnInit {

  constructor(private _httpService: Http, private route: ActivatedRoute) { }

  private title: string = "";
  private id: number;
  private sub: any;
  private customer: CustomerModel = new CustomerModel();
  private isEdit: boolean = true;

  private myForm: FormGroup;


  ngOnInit() {
    this.myForm = new FormGroup({
      'name': new FormControl(),
      'description': new FormControl()//,
      //'location': new FormGroup({
      //    'country': new FormControl(),
      //    'city': new FormControl()
      //}),
      //'phoneNumbers': new FormArray([new FormControl('')])
    });

    this.sub = this.route.params.subscribe(params => {
      if (!params['id']) {
        this.isEdit = false;
        this.title = "Add Customer";
      }
      else {
        this.id = +params['id'];
        this.title = "Edit Customer";
      }
    });

    if (this.isEdit) {
      var url = AppSettings.API_ENDPOINT + "/customer/GetCustomer/" + this.id;
      this._httpService.get(url).subscribe(values => {
        this.customer = values.json() as CustomerModel;
      });
    }
  }

  addOrUpdate(): void {
    let url = "";
    if (this.isEdit) { url = AppSettings.API_ENDPOINT + "/customer/UpdateCustomer"; }
    else { url = AppSettings.API_ENDPOINT + "/customer/AddCustomer"; }
    this.add(url, this.customer).subscribe(values => {
      window.location.href = "/customers";
    });
    //this._httpService.post(url, JSON.stringify(this.customer), this.addHeaders()).subscribe(values => {
    //  //window.location.href = "/customers";
    //});
  }

  add(url: string, customer: CustomerModel) {
    return this._httpService.post(url, JSON.stringify(customer), this.addHeaders())
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
    window.location.href = "/customers";
  }
}
