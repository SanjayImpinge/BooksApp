import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './not-found.html'
})
export class NotFoundComponent {
    errorMessage: string = "404 Not Found";
}