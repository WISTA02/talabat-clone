'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const signInRouter = require('./routes/signInRouter');
const signUpRouter = require('./routes/signUpRouter');
const secretRouter = require('./routes/secretRouter');
const getUsersRouter = require('./routes/allUsersRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const orderRouter = require('./routes/orderRouter');
const searchRouter=require("./routes/searchRouter")
const ratingRouter = require("./routes/ratingRouter");
const locationRouter=require("./routes/locationRouter")
const mealRouter = require('./routes/mealRouter');
const restaurantMealRouter = require('./routes/restaurantMealsRouter');
const driverRouter = require('./routes/driverRouter');
const profitRouter=require("./routes/profitRouter");


// Prepare the express app
const app = express();
app.get('/', (req, res) => {
  res.send('Home');
});

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(signUpRouter);
app.use(signInRouter);
app.use(secretRouter);
app.use(locationRouter);
app.use(restaurantMealRouter);

app.use(getUsersRouter);
app.use(mealRouter);
app.use(restaurantRouter);
app.use(orderRouter);
// app.use(locationRouter);
// Routes
app.use(driverRouter);

app.use(searchRouter);
app.use(locationRouter);
app.use(ratingRouter);
app.use(profitRouter);


// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  startup: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
