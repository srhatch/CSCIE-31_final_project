const express = require('express');
const {ReviewService, checkInput} = require('../../controllers/reviewController');

var router = express.Router();

router.use((req, res, next) => {
    // sets necessary headers to allow testing from a
    // different domain, and to allow pre-flight requests.
    // also set content-type to json
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    });
    if(req.method == 'OPTIONS') {
        return res.status(200).end();
    }
    next();
})

router.get('/subway/:lineColor', async (req, res, next) => {
    // retrieves all reviews for a specified subway line
    try {
        var getReviews = await ReviewService.getReviews(req.params.lineColor);
        res.status(200);
        res.send(JSON.stringify(getReviews));
    } catch(err) {
        console.error(err);
    }
});

router.get('/reviews/:reviewId', async (req, res, next) => {
    // retrieves a single review. used when updating a review
    // and for logging during testing
    try {
        var getOneReview = await ReviewService.getOneReview(req.params.reviewId);
        res.status(200);
        res.send(JSON.stringify(getOneReview));
    } catch (err) {
        console.error(err);
    }
});

router.post('/postReview', checkInput, async (req, res, next) => {
    // saves a new review to the database
    var reviewData = {
        name: req.body.name,
        reviewText: req.body.reviewText,
        subwayLine: req.body.subwayLine,
        createdAt: req.body.createdAt
    }
    try {
        var newReview = await ReviewService.submitReview(reviewData);
        res.status(201);
        res.send(JSON.stringify(newReview));
    } catch (err) {
        console.error(err);
    }
});

router.put('/postEdit/:reviewId', checkInput, async (req, res, next) => {
    // edits an existing review
    try {
        var updateReview = await ReviewService.submitEdit(
            req.params.reviewId,
            {
                name: req.body.name,
                reviewText: req.body.updateText,
                updatedAt: req.body.updatedAt
            },
            {runValidators: true}
        )
        res.status(200);
        res.send(JSON.stringify(updateReview));
    } catch(err) {
        console.error(err);
    }
});

router.delete('/:reviewId', async (req, res, next) => {
    // deletes a review
    try {
        var deleteReview = await ReviewService.deleteReview(req.params.reviewId);
        res.status(200);
        res.send(JSON.stringify(deleteReview));
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;