/* radio button selection learned from:
https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
*/
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#submit-test').addEventListener('click', () => {
        ApiTest();
    })
})

async function ApiTest() {
    // get the subway line color from radio selection
    var subwayLine = document.getElementsByName('lineselect');
    for(let i = 0; i < subwayLine.length; i++) {
        if(subwayLine[i].checked) {
            var lineColor = subwayLine[i].value;
        }
    }

    try {
        // GET all reviews for a specified subway line
        var getReviews = await runFetch('GET', `api/reviews/subway/${lineColor}`)
        console.log(`Retrieving all reviews for the ${lineColor} line...`)
        console.log(getReviews);
    
        // POST (save) a new review with data retrieved from html page
        reviewName = document.querySelector('#username-id-test').value;
        reviewText = document.querySelector('#review-id-test').value;
        reviewData = {
            name: reviewName,
            reviewText: reviewText,
            subwayLine: lineColor,
            createdAt: new Date()
        }
        var newReview = await runFetch('POST', `api/reviews/postReview`, reviewData)

        // GET the newly saved review
        var getNewReview = await runFetch('GET', `api/reviews/reviews/${newReview._id}`);
        console.log(`\nCreated a new review for the ${lineColor} line: `)
        console.log(getNewReview);
    
        // PUT (edit) the newly saved review
        var editBody = {
            name: newReview.name,
            updateText: 'This review has been updated by the API',
            updatedAt: new Date()
        };
        var editReview = await runFetch('PUT', `api/reviews/postEdit/${newReview._id}`, editBody)
        console.log('\nUpdated the review: ')
        console.log(editReview);

        // GET newly edited review
        var getUpdatedReview = await runFetch('GET', `api/reviews/reviews/${editReview._id}`);
        console.log('\nShow updated review: ')
        console.log(getUpdatedReview);
    
        // DELETE the newly edited review
        var deleteReview = await runFetch('DELETE', `api/reviews/${editReview._id}`);
        console.log('\nDeleting review...')
        console.log(deleteReview);
    } catch(err) {
        console.error(err);
    }
}

async function runFetch(method, path, body) {
    try {
        var response = await fetch(`http://localhost:8080/${path}`, {
            method: method,
            ...(method=='POST' || method=='PUT' ? {headers: {'Content-Type': 'application/json'}} : {}),
            ...(method=='POST' || method=='PUT' ? {body: JSON.stringify(body)} : {})
        })
        return response.json();
    } catch(err) {
        console.error(err);
    }
}
