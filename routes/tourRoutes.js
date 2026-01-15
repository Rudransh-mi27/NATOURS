const express = require('express');
// const  router  = require('../app');
const tourcontrol = require(`${__dirname}/../controller/tourControler`);
const Router = express.Router();
Router.route('/top-5-cheap').get(
  tourcontrol.aliasTopTours,
  tourcontrol.getTours,
);
Router.route('/tour-stats').get(tourcontrol.getTourStats);
Router.route('/monthly-plan/:year').get(tourcontrol.getMonthlyPlan);
// Router.param('x',tourcontrol.checkID)
Router.route(`/`).get(tourcontrol.getTours).post(tourcontrol.createTour);
// app.get(`/api/v1/tours`, getTours);
// app.post(`/api/v1/tours`, createTour);
Router.route(`/:id`)
  .get(tourcontrol.getTourbyid)
  .patch(tourcontrol.updatedTour)
  .delete(tourcontrol.deleteTour);

// app.get(`/api/v1/tours/:x`, getTourbyid);
// app.patch('/api/v1/tours/:x', updatedTour);
// app.delete('/api/v1/tours/:x', deleteTour);
module.exports = Router;
