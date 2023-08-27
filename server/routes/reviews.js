const express = require('express');
const reviewsRouter = express.Router();
const { getReview, postReview } = require('../controller/reviews.js');


reviewsRouter.post('/', postReview);

reviewsRouter.get(':id', getReview)

module.exports = reviewsRouter;