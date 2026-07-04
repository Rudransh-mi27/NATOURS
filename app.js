const express = require('express');
const path = require('path');

const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitization = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/ErrorControler');

const TourRouter = require(`${__dirname}/routes/tourRoutes`);
const UserRouter = require(`${__dirname}/routes/userRoutes`);
const ReviewRouter = require(`${__dirname}/routes/reviewRoutes`);
const ViewRouter = require(`${__dirname}/routes/viewRoutes`);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//-------------1) GLOBAL MIDDELEWARES------------------
app.use(express.static(path.join(__dirname, 'public')));
// Set security HTTP method
app.use(helmet());

// Development login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limiting requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from this IP, try after an hour!',
});
app.use('/api', limiter);

// Body parser, readind data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL injection query
app.use(mongoSanitization());

// Data sanitization against XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'duration',
      'price',
    ],
  }),
);

// Serving static file

// Testing middleware
app.use((req, res, next) => {
  const requestedAt = new Date().toISOString();

  next();
});

//---------------3) ROUTERS---------------------------

app.use('/', ViewRouter);
app.use('/api/v1/tours', TourRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/reviews', ReviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
//----------------------4) STARTED SERVER--------------------

module.exports = app;
