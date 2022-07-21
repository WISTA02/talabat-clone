'use strict';
const express = require('express');
require("dotenv").config();
const { users } = require('../auth/models/index');
const bcrypt=require("bcrypt");
const signUpRouter=express.Router();


signUpRouter.post('/signup', async (req,res,next) =>{
  try {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const userRecord = await users.create(req.body);
  // users.role = req.body.role;
    const output = {
      user: userRecord,
      role:userRecord.role,
      action:userRecord.action
    };
    res.status(201).json(output);
  } catch (e) {

    next(e);
  }
});


module.exports = signUpRouter;