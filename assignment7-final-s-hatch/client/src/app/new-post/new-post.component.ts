import { Component, EventEmitter, Output } from '@angular/core';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [ReviewsService]
})
export class NewPostComponent {
  constructor(private reviewsService:ReviewsService) {}

  // hides the form once the review is submitted
  @Output() hideForm = new EventEmitter();

  // the subway line color of the newly entered review
  // is passed through this event emitter
  @Output() showReviews = new EventEmitter<string>();

  // object to store the new review, passed to the data service
  newReview:any = {
    createdAt: new Date()
  };

  submitNewReview(form:any):void {
    // call data service to post a new review
    this.reviewsService.submitNewReview(this.newReview).subscribe((res:any) => {
      console.log(res);

      // clears out the form
      form.reset();
      // emits an event to toggle
      // the html form to be hidden
      this.hideForm.emit();

      // sends the subway line color to the main component
      // so the reviews for that line can be opened and the
      // new review can be displayed
      let subwayLine:string = res.subwayLine;
      // emits an event to main component to display the
      // reviews for a specified subway line
      this.showReviews.emit(subwayLine);
    })
  }
}
