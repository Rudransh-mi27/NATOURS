const express = require('express');

const Router = express.Router({ mergeParams: true });
const reviewControler = require('../controller/reviewControler');
const authControler = require('../controller/authControler');

Router.use(authControler.protect);
Router.route('/')
  .get(reviewControler.getAllReviews)

  .post(
    authControler.restrictTo('user'),
    reviewControler.setTourUserId,
    reviewControler.createReview,
  );

Router.route('/:id')
  .patch(
    authControler.restrictTo('user', 'admin'),
    reviewControler.updateReview,
  )
  .get(reviewControler.getReview)
  .delete(
    authControler.restrictTo('user', 'admin'),
    reviewControler.deleteReview,
  );
module.exports = Router;
