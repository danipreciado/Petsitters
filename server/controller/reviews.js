const Review = require('../models/Review');

module.exports = {
    postReview: async (req, res, next) => {
        try {
            const { petSitterId, rating, comment } = req.body;

            const newReview = new Review({
                petSitterId,
                rating,
                comment,
            });

            const savedReview = await newReview.save();
            res.status(201).json(savedReview);
        } catch (error) {
            next(error);
        }
    },

    getReview: async (req, res, next) => {
        try {
            const { petSitterId } = req.params;

            const reviews = await Review.find({ petSitterId });
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    },
}
