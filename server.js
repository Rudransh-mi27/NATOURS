const dotenv = require('dotenv').config({ path: `${__dirname}/config.env` });

// dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down!!');
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connet successfuly');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down!!');
  server.close(() => {
    process.exit(1);
  });
});
