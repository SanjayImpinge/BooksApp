import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import 'rxjs/add/operator/map'
import {Router} from '@angular/router'
import { AppSettings } from '../../constants/appsettings';
import { BookModel } from "../../models/bookmodel";
import { IMyDpOptions } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './editbook.html',
  styleUrls: ['./book.css']
})
export class EditBooksComponent implements OnInit {

  constructor(private _httpService: Http, private route: ActivatedRoute, private router: Router) { }

  private title: string = "";
  private id: number;
  private sub: any;
  private book: BookModel = new BookModel();
  private isEdit: boolean = true;

  private myForm: FormGroup;

  dropdownList: any = [];
  selectedItems : any=[];
  dropdownSettings: any;
  date: any = { date: { year: 2018, month: 10, day: 9 } };

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
  };
 
  onItemSelect(item):any {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item): any{
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

      this.dropdownSettings = {
      singleSelection: false,
      text: "Select Authors",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.myForm = new FormGroup({
      'name': new FormControl(),
      'author': new FormControl(),//,
      'pages': new FormControl(),
      'authors':new FormControl(),
      'dateofpublication': new FormControl()
    });

    this.sub = this.route.params.subscribe(params => {
      if (!params['id']) {
        this.isEdit = false;
        this.title = "Add Book";
        var url = AppSettings.API_ENDPOINT + "/book/GetAuthors/";
        this._httpService.get(url).subscribe(values => {
          this.dropdownList = values.json();
          console.log(values.json());
       
        });
      }
      else {
        this.id = +params['id'];
        this.title = "Edit Book";
      }
    });

    if (this.isEdit) {
      var url = AppSettings.API_ENDPOINT + "/book/GetBook/" + this.id;
      this._httpService.get(url).subscribe(values => {
        this.book = values.json() as BookModel;

        let date = new Date(this.book.dateofpublication);
        
        this.date = {
            date: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            }
        }

        console.log(this.book,'this.book')
        this.dropdownList = this.book._author;
        this.selectedItems = this.book.authorIds;
      });
    }
  }

  addOrUpdate(): void {
    let url = "";
    console.log(this.selectedItems)
    this.book.authorIds = this.selectedItems;
    this.book.dateofpublication = this.date.date.month + '-' + this.date.date.day + '-' + this.date.date.year;
    if (this.isEdit) { url = AppSettings.API_ENDPOINT + "/book/UpdateBook"; }
    else { url = AppSettings.API_ENDPOINT + "/book/AddBook"; }
    this.add(url, this.book).subscribe(values => {
      this.router.navigate(['/books']);
    });
  }

  add(url: string, book: BookModel) {
   console.log(this.selectedItems)
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
   
    this.router.navigate(['/']);
  }
}
