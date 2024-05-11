const express = require('express');
const {ReviewService, checkInput} = require('../controllers/reviewController');
router = express.Router();


router.get('/', (req, res, next) => {
    // renders the home page with links to review pages
    // for all subway lines
    res.render('home', {layout: 'main'});
});

router.get('/subway/:lineColor', async (req, res, next) => {
    // retrieves all reviews for a specified subway line
    try {
        var getReviews = await ReviewService.getReviews(req.params.lineColor);
        
        // convert all reviews to javascript objects in
        // order to pass in to handlebars template
        jsReviews = [];
        getReviews.forEach((review) => {
            jsReviews.push(review.toObject());
        })
        res.render(
            'subway',
            {
                layout: 'main',
                reviews: jsReviews,
                color: req.params.lineColor,
                submitErrorMsg: req.query.submitErrorMsg,
                name: req.query.name,
                reviewText: req.query.reviewText
            }
        )
    } catch (err) {
        console.error(err);
    }
})

router.post('/subway/:lineColor', checkInput, async (req, res, next) => {
    // saves a new review to the database
    var reviewData = {
        name: req.body.username,
        reviewText: req.body.review,
        subwayLine: req.params.lineColor,
        createdAt: new Date()
    }
    try {
        await ReviewService.submitReview(reviewData);
        res.status(201);
        res.redirect(`/subway/${req.params.lineColor}`);
    } catch (err) {
        // if any of the fields are not filled out, flash an error
        // to the screen
        req.flash('inputError', 'Both fields must be filled out')
        console.error(err);
        res.redirect(
            `/subway/${req.params.lineColor}?submitErrorMsg=${req.flash('inputError')}&name=${req.body.username}&reviewText=${req.body.review}`
        );
    }
});

router.delete('/:subwayLine/:reviewId', async (req, res, next) => {
    // delete a specified review
    try {
        await ReviewService.deleteReview(req.params.reviewId);
        res.redirect(`/subway/${req.params.subwayLine}`)
    } catch (err) {
        console.error(err);
    }
});

router.get('/edit/:reviewId', async (req, res, next) => {
    // renders the edit page, displaying a single review
    try {
        var review = await ReviewService.getOneReview(req.params.reviewId);
        res.render('edit',
            {
                layout: 'main',
                reviewId: review._id,
                name: review.name,
                reviewText: review.reviewText,
                lineColor: review.subwayLine,
                submitErrorMsg: req.query.submitErrorMsg
            }
        )
    } catch (err) {
        console.error(err);
    }
});

router.put('/editSubmit/:lineColor/:reviewId', checkInput, async (req, res, next) => {
    // saves an edited review to the database
    try {
        await ReviewService.submitEdit(
            req.params.reviewId,
            {
                name: req.body.username,
                reviewText: req.body.editSubmit,
                updatedAt: new Date()
            },
            {runValidators: true}
        )
        res.redirect(`/subway/${req.params.lineColor}`);
    } catch (err) {
        // if any fields are empty, flash an error to the screen
        req.flash('inputError', 'Both fields must be filled out')
        console.error(err);
        res.redirect(`/edit/${req.params.reviewId}?submitErrorMsg=${req.flash('inputError')}`);
    }
});

module.exports = router;