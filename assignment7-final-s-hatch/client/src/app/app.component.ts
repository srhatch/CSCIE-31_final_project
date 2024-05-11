/* I'm not using ngOnInit to display data 
because the reviews are hidden when the page loads.
Reviews are displayed on the page after buttons are clicked, so 
the API call is made when that click event is triggered
*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}

