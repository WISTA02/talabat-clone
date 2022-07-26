// const driverRouter =require ("../models/index");

const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");
const { orderTable } = require("../auth/models/index");
const driverRouter = express.Router();
driverRouter.get("/driver", bearer, getAllOrder);
driverRouter.post("/driver", bearer, updateStatues);

///////////select *//////////////////
async function getAllOrder(req, res) {
  let orders;
  x=0;
  console.log(req.user.role);

  if (req.user.role === "driver"||req.user.role === "Admin") {
    orders = await orderTable.findAll({
      where: { status: "restaurant-is-accepting" },
    });
    res.status(200).json(orders);
  } else {
    res.status(500).send("Access Denied");
  }
}
let x=0;
////////////////updateStatues////////////////////
async function updateStatues(req, res) {
  let s;
  if(x==0)s="driver-accepted";
  if(x==1)s="Out-for-Delivery";
  if(x>=2)s="Delivered";
  if(req.user.role === "driver" ||req.user.role === "Admin")
  {
  try {
    let orderID = req.body.id;
    let updated = await orderTable.update(
      { driver_ID: req.user.id, status: s },
      { where: { id: orderID } }
    );
    let order = await orderTable.findOne({ where: { id: orderID } });
    res.status(201).json(order);
x++;
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }}
  else{

    res.status(500).send("Access Denied");
  }
}

module.exports = driverRouter;
