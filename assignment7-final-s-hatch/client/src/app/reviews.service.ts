import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http:HttpClient) {}

  // The base url for the MBTA reviews api
  private baseUrl:string = environment.baseUrl;

  listReviews(lineColor:string) {
    // Retrieves all reviews for a specified subway line
    return this.http.get(`${this.baseUrl}/subway/${lineColor}`);
  }

  getOneReview(reviewId:any):any {
    return this.http.get(`${this.baseUrl}/reviews/${reviewId}`);
  }

  submitNewReview(reviewObj:any):any {
    return this.http.post(`${this.baseUrl}/postReview`, reviewObj);
  }

  submitEdit(reviewId:any, editObj:any):any {
    return this.http.put(`${this.baseUrl}/postEdit/${reviewId}`, editObj);
  }

  deleteReview(reviewId:any) {
    return this.http.delete(`${this.baseUrl}/${reviewId}`);
  }
}

