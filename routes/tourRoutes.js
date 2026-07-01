const express = require('express');
// const  router  = require('../app');
const tourcontrol = require(`${__dirname}/../controller/tourControler`);
const Router = express.Router();
const authController = require('../controller/authControler');
const reviewController = require('../controller/reviewControler');
const ReviewRouter = require('./reviewRoutes');

Router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(
  tourcontrol.getToursWithin,
);
Router.route('/distances/:latlng/unit/:unit').get(tourcontrol.getDistances);

Router.use('/:tourId/reviews', ReviewRouter);

Router.route('/top-5-cheap').get(
  tourcontrol.aliasTopTours,
  tourcontrol.getTours,
);

Router.route('/tour-stats').get(tourcontrol.getTourStats);
Router.route('/monthly-plan/:year').get(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  tourcontrol.getMonthlyPlan,
);

// Router.param('x',tourcontrol.checkID)
Router.route(`/`)
  .get(tourcontrol.getTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourcontrol.createTour,
  );
// app.get(`/api/v1/tours`, getTours);
// app.post(`/api/v1/tours`, createTour);
Router.route(`/:id`)
  .get(tourcontrol.getTourbyid)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourcontrol.updatedTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourcontrol.deleteTour,
  );

// app.get(`/api/v1/tours/:x`, getTourbyid);
// app.patch('/api/v1/tours/:x', updatedTour);
// app.delete('/api/v1/tours/:x', deleteTour);

module.exports = Router;
