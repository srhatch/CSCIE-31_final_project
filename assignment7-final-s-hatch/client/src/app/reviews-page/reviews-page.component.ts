import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})
export class ReviewsPageComponent {
  // Passes in reviews for the specified subway line from app.component
  @Input() reviews:any;
 
  // Passes in the subway line from app.component
  @Input() lineColor:string = '';
}

