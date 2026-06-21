const express = require('express');

const Router = express.Router({ mergeParams: true });
const reviewControler = require('../controller/reviewControler');
const authControler = require('../controller/authControler');

Router.route('/')
  .get(reviewControler.getAllReviews)

  .post(
    authControler.protect,
    authControler.restrictTo('user'),
    reviewControler.setTourUserId,
    reviewControler.createReview,
  );

Router.route('/:id')
  .patch(reviewControler.updateReview)
  .get(reviewControler.getReview)
  .delete(reviewControler.deleteReview);
module.exports = Router;
