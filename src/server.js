'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const signInRouter=require("./routes/signInRouter");
const signUpRouter=require("./routes/signUpRouter");
const secretRouter=require("./routes/secretRouter");
const getUsersRouter=require("./routes/allUsersRouter");
const resturantRouter = require("./routes/resturantRouter");
// const authRoutes = require('./auth/router/index.js');
// const foodRouter=require("../src/auth/router/meal");
// const orderRouter=require("../src/auth/router/order");


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
app.use(resturantRouter);

// Routes
// app.use(orderRouter);
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
