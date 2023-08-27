const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    petSitterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PetSitter',
        required: true,
    },
    rating: Number,
    comments: String,

});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;