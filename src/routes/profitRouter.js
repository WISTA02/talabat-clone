'use strict';

const express = require('express');

const bearer = require('../auth/middleware/bearer');

const { orderTable,restTable } = require('../auth/models/index');

const role = require('../auth/middleware/role');
const profitRouter = express.Router();
profitRouter.get('/profit', bearer, role(["driver","owner"]), handleGetProfit);

///////////////////////function
async function handleGetProfit(req,res){
    let profit=0;
  let appProfit=0;
    ////////////////////////driver profit
    if (req.user.role == "driver") {
      let orders = await orderTable.findAll({
        where: { driver_ID: req.user.id },
      });
      console.log(orders.length);
      for (const element of orders) {
        let rest = await restTable.findOne({
          where: { id: element.resturantId },
        });
        profit += rest.delivery_fee * 0.5;
        appProfit += rest.delivery_fee * 0.5;
      }
      res.status(201).json(profit);
      ///////////////resturant profit
    } else if (req.user.role == "owner") {
      let rest = await restTable.findOne({ where: { ownerId: req.user.id } });
      let order = await orderTable.findAll({ where: { resturantId: rest.id } });
      for (const element of order) {
        
        let rest = await restTable.findOne({
          where: { id: element.resturantId },
        });
        proft = profit + element.total_price - rest.delivery_fee ;
        appProfit=.2*profit;
        profit=.8*profit;
      }
      res.status(201).json(profit);
    }else if (req.user.role == "admin"){
      res.status(201).json(appProfit);
    }
    
}

module.exports=profitRouter;