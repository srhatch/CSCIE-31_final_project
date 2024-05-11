const Review = require('../models/reviewModel');
const { body } = require('express-validator');

class ReviewService {
    static getReviews(lineColor) {
        // returns all reviews for a specified subway line and
        // sorts them in descending order by date
        return Review.find({subwayLine: lineColor}).sort({createdAt: -1})
        .then((reviews) => {
            return reviews;
        })
    }

    static getOneReview(reviewId) {
        // returns a single review
        return Review.findById(reviewId)
        .then((review) => {
            return review;
        })
    }

    static submitReview(reviewData) {
        // saves a new review
        var newReview = new Review(reviewData);
        return newReview.save();
    }

    static deleteReview(reviewId) {
        // deletes a review
        return Review.deleteOne({_id: reviewId});
    }

    static submitEdit(reviewId, reviewData, options) {
        // saves an edited review
        return Review.findByIdAndUpdate(reviewId, reviewData, options)
        .then((review) => {
            return review;
        })
    }
}

exports.checkInput = [
    // sanitizes user input by escaping any
    // html characters and trimming whitespace
    body('username').trim().escape(),
    body('review').trim().escape()
];
exports.ReviewService = ReviewService;
