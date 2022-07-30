"use strict";
const express = require("express");
const ratingRouter = express.Router();
const bearer = require("../auth/middleware/bearer");
const role = require("../auth/middleware/role");
const { orderTable, restTable } = require("../auth/models/index");
ratingRouter.put("/rating", bearer, role(["user"]), ratingHandler);
ratingRouter.get("/rating", bearer, role(["user"]), getUserOrders);

async function getUserOrders(req,res){
    let orders = await orderTable.findAll({
        where: {  userId: req.user.id,rated:false },
      });   
      res.status(200).json(orders);
}

async function ratingHandler(req, res) {
  // rest rat ,, meal rate ,, order id
  //check body
  if (req.body.restRate) {
    let order = await orderTable.findOne({
      where: { id: req.body.orderId, userId: req.user.id },
    });
    //check if the  user has this order
    if (order){
    let rest = await restTable.findOne({ where: { id: order.resturantId } });
    // 9 //9 10 //9.5   count*avg=sum   sum+rating/count+1=avg
    if (rest.rating == 0) {
      rest.rating = req.body.restRate;
      let updated = await restTable.update(
        { rating: req.body.restRate },
        { where: { id: rest.id } }
      );
      let updatedRes = await restTable.findOne({ where: { id: rest.id } });
      let updatedOrder = await orderTable.update(
        { rated: true },
        { where: { id: order.id } }
      );
      let x = await orderTable.findOne({ where: { id: order.id } });
      res.status(201).json(updatedRes);
    }
    //check if it rated befor only one rating for every order
    else if (!order.rated) {
        console.log("elseeeeeeeeeeee if");
      let ratedOrders = await orderTable.findAll({
        where: { resturantId: rest.id, rated: true },
      });
      console.log(ratedOrders.length);
      let count = ratedOrders.length;
      let sum = count * rest.rating;
      console.log(req.body.restRate);
      sum += req.body.restRate;
      console.log(sum);
      count += 1;
      let avg = sum / count;
      rest.rating = avg;
      let updated = await restTable.update(
        { rating: avg },
        { where: { id: rest.id } }
      );
      let updatedOrder = await orderTable.update(
        { rated: true },
        { where: { id: order.id } }
      );
      res.status(201).json(rest);
    } else {
      res.status(500).send("rated before");
    }
}
else{
    res.status(500).send(`There is no order  with ID=${req.body.orderId} for u` );   
}
  }
}
module.exports = ratingRouter;
