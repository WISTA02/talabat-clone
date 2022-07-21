'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
// const authRoutes = require('../src/routes/index');
// const foodRouter=require("../src/auth/router/meal");
const driverRouter=require("../src/routes/driver");
const signInRouter=require("./routes/signInRouter");
const signUpRouter=require("./routes/signUpRouter");
const secretRouter=require("./routes/secretRouter");
const getUsersRouter=require("./routes/allUsersRouter");
// const authRoutes = require('./auth/router/index.js');
// const foodRouter=require("../src/auth/router/meal");
// const orderRouter=require("../src/auth/router/order");
const mealRouter = require('./routes/mealRouter');
const routerServer = require("./routes/router-server")
// const resturantRouter = require("./routes/resturantRouter");



// Prepare the express app
const app = express();
app.get("/",(req,res)=>{
  res.send("Home");
})

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(signUpRouter);
app.use(signInRouter);
app.use(secretRouter);
app.use(getUsersRouter);
app.use(mealRouter);
app.use(routerServer);


// Routes
app.use(driverRouter);
// app.use(foodRouter);
// app.use(authRoutes)


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
