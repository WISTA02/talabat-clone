'use strict';
const express = require('express');
require('dotenv').config();
const { users } = require('../auth/models/index');
const bcrypt = require('bcrypt');
const signUpRouter = express.Router();
const regex=require("../auth/middleware/regex")

signUpRouter.post('/signup',regex(), async (req, res) => {
  try {
    console.log("login");
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const obj = {
      username: req.body.username,
      password: hashedPass,
      role: req.body.role,
      email:req.body.email,
      phone:req.body.phone
    };
    const userRecord = await users.create(obj);

    res.status(201).json(userRecord);
  } catch (e) {
    res.status(404).end();
  }
});

module.exports = signUpRouter;
