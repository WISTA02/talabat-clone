'use strict';
const express = require('express');
const signUpRouter=express.Router();
const {users}=require('../auth/models/index');

console.log(users);

signUpRouter.post('/signup', async (req,res,next) =>{
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

module.exports= signUpRouter;