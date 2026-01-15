const express = require('express');

const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/ErrorControler');

const TourRouter = require(`${__dirname}/routes/tourRoutes`);
const UserRouter = require(`${__dirname}/routes/userRoutes`);
//-------------1) MIDDELEWARES------------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//---------------3) ROUTERS---------------------------

app.use('/api/v1/tours', TourRouter);
app.use('/api/v1/users', UserRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
//----------------------4) STARTED SERVER--------------------

module.exports = app;
