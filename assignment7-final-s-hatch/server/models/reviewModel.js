const mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    // defines the database model for a review allowing
    // for the option of an edit timestamp
    name: {type: String, required: true},
    reviewText: {type: String, required: true},
    subwayLine: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date}
});

module.exports = mongoose.model('Review', reviewSchema);