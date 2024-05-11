import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
  providers: [ReviewsService] // connect the data service to this component
})
export class EditPageComponent {
  constructor(
    private reviewsService:ReviewsService,
    private route:ActivatedRoute,
    private router:Router
  ) {}

  // get the url parameter to retrieve a single review
  reviewId:any = this.route.snapshot.paramMap.get('id');

  // store the review data here
  retrievedReview:any = [];
  
  submitEdit(reviewObj:any):void {
    // creates a review object and sends that object to the data
    // service
    let editedReview:any = {};
    editedReview.name = reviewObj.nameEdit;
    editedReview.updateText = reviewObj.reviewEdit;
    editedReview.updatedAt = new Date();

    this.reviewsService.submitEdit(this.reviewId, editedReview).subscribe((res:any) => {
      // redirects back to the home page
      this.router.navigate(['/'])
    })
  }

  deleteReview() {
    // gives the user a prompt to confirm delete choice
    if (confirm('Delete this review? This action cannot be undone')) {
      this.reviewsService.deleteReview(this.reviewId).subscribe((res) => {
        console.log(res);
        // navigates back to home page
        this.router.navigate(['/']);
      });
    }
  }

  ngOnInit() {
    // call review service to get the contents of the specified review
    // once the page loads
    this.reviewsService.getOneReview(this.reviewId).subscribe((review:any) => {
      this.retrievedReview = review;
    })
  }
}
