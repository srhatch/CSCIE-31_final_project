import { Component } from '@angular/core';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [ReviewsService] // connect the data service to this component
})
export class MainPageComponent {
  constructor(private reviewsService:ReviewsService) {}

  // determines the visibility of the new review form
  hideNewPost:boolean = true;

  showNewPost():void {
    // displays the form to create a new post
    // after the "Write a Review" button is clicked
    this.hideNewPost = false;
  }

  hideForm():void {
    // after a review is saved, hide the form
    this.hideNewPost = true;
  }

  showReviews(subwayLine:string):void {
    // after a review is saved, display the reviews for
    // that subway line
    if (subwayLine === 'Red') {
      this.showRedReviews();
    } else if (subwayLine === 'Green') {
      this.showGreenReviews();
    } else if (subwayLine === 'Orange') {
      this.showOrangeReviews();
    } else if (subwayLine === 'Blue') {
      this.showBlueReviews();
    }
  }

  // Reviews are passed to the html in this array
  reviews:any = [];
  
  // Specifies the subway line
  lineColor:string = '';

  // Determines whether reviews are hidden or visible on the page
  // Reviews are hidden when the page loads
  hideReviews:boolean = true;

  showRedReviews():void {
    // Displays reviews for the Red Line. This is called by
    // a 'click' event handler in the html
    this.hideReviews = false;
    // Clears out and sets the line color
    this.lineColor = '';
    this.lineColor = 'Red';
    // Clears out the array so only reviews from this line are sent
    // to the html
    this.reviews = [];
    // Call on data service to send http request for review data
    this.reviewsService.listReviews('Red').subscribe((reviews) => {
      this.reviews = reviews;
    })
  }

  showGreenReviews():void {
    // Displays reviews for the Green Line
    this.hideReviews = false;
    this.lineColor = '';
    this.lineColor = 'Green';
    this.reviews = [];
    this.reviewsService.listReviews('Green').subscribe((reviews) => {
      this.reviews = reviews;
    })
  }

  showOrangeReviews():void {
    // Displays reviews for the Orange Line
    this.hideReviews = false;
    this.lineColor = '';
    this.lineColor = 'Orange';
    this.reviews = [];
    this.reviewsService.listReviews('Orange').subscribe((reviews) => {
      this.reviews = reviews;
    })
  }

  showBlueReviews():void {
    // Displays reviews for the Blue Line
    this.hideReviews = false;
    this.lineColor = '';
    this.lineColor = 'Blue';
    this.reviews = [];
    this.reviewsService.listReviews('Blue').subscribe((reviews) => {
      this.reviews = reviews;
    })
  }
}
