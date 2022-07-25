// const driverRouter =require ("../models/index");

const express = require("express");
const { json } = require("express/lib/response");
const bearer=require("../auth/middleware/bearer");
const acl=require("../auth/middleware/acl");
const { orderTable } = require("../auth/models/index");
const driverRouter = express.Router();
driverRouter.get("/driver",bearer,acl("read"), getAllOrder);
driverRouter.post("/driver",bearer,acl("read"), updateStatues);


///////////select *//////////////////
async function getAllOrder(req, res) {
  let orders = await orderTable.findAll({
    where: { status: "restaurant-is-accepting" },
  });
  res.status(200).json(orders);
}

////////////////updateStatues////////////////////
async function updateStatues(req, res) {
  try {
    let orderID = req.body.id;  
    let updated = await orderTable.update({driver_ID : req.user.id,status :"driver-accepted"},{ where: { id: orderID } });
    let order = await orderTable.findOne({ where: { id: orderID } });
    res.status(201).json(order);

//     setTimeout(()=>{
// // console.log("/hiiiiiiiiiiiiiiiiiiiiiiiii");
//       res.status(200).send("hiiii")
//     },200)
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
    
  }
}


module.exports = driverRouter;
