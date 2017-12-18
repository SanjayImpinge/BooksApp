import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { CustomerModel } from '../../models/customer.model';
import { AppSettings } from '../../constants/appsettings';

@Component({
    selector: 'app-root',
    templateUrl: './customers.html',
    styleUrls: ['./customers.css']
})
export class CustomersComponent implements OnInit {

    constructor(private _httpService: Http) { }

    private customers: CustomerModel[];

    ngOnInit() {
      this._httpService.get(AppSettings.API_ENDPOINT + '/customer/GetCustomers').subscribe(values => {
            this.customers = values.json() as CustomerModel[];
        });
    }

    private delete(id: number): void {
        var isConfirm = confirm("Are you sure?");

        if (isConfirm) {
          this._httpService.post(AppSettings.API_ENDPOINT + '/customer/DeleteCustomer/' + id, {}).subscribe(values => {
                let index = this.customers.findIndex(x => x.id === id); //find index in your array
                this.customers.splice(index, 1);//remove element from array
            });
        }
    }
}
