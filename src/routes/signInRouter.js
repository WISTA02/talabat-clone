'use strict';
const express = require('express');
const signInRouter=express.Router();
const basicAuth=require('../auth/middleware/basic');


signInRouter.post('/signin', basicAuth ,(req,res,next)=>{
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});


module.exports= signInRouter;