'use strict';
const express = require('express');
const getUsersRouter=express.Router();
const {users}=require('../auth/models/index');
const bearer = require('../auth/middleware/bearer');


getUsersRouter.get('/users', bearer ,async(req,res,next)=>{
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  
});


module.exports= getUsersRouter;