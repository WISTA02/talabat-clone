// const driverRouter =require ("../models/index");

const express = require("express");
const bearer = require("../auth/middleware/bearer");
const role = require("../auth/middleware/role");

const { orderTable, restTable, users } = require("../auth/models/index");
const { Sequelize, DataTypes } = require("sequelize");
const Op = Sequelize.Op;
const driverRouter = express.Router();
driverRouter.get("/driver", bearer, role("driver"), getAllOrder);
driverRouter.put("/driver", bearer, role("driver"), updateStatues);
/** let rest = await restTable.findAll({where:{  name: {
        [Op.like]: `%${req.body.resturant}%`,
      }}}) */

///////////get all order//////////////////
async function getAllOrder(req, res) {
  let orders;
  x = 0;
  console.log(req.user.role);
  let client = await users.findAll({ where: { location:{city: req.user.location.city} } });
  orders = await orderTable.findAll({
    where: { [Op.and]: [{ status: "Restaurant-is-accepting" }] },
  });
  res.status(200).json(orders);
}
let x = 0;
let y=0
////////////////updateStatues////////////////////
async function updateStatues(req, res) {
  let s;
  if (x == 0) {s = "Driver-accepted"};
  if (x == 1) s = "Out-for-delivery";
  if (x >= 2) s = "Delivered";

  try {
    let orderID = req.body.id;
    let updated = await orderTable.update(
      { driver_ID: req.user.id, status: s },
      { where: { id: orderID } }
    );
    let order = await orderTable.findOne({ where: { id: orderID } });

    let resturant = await restTable.findOne({
      where: { id: order.resturantId },
    });
    let restLocation = resturant.location;
    let client = await users.findOne({ where: { id: order.userId } });
    let clinetLocation = client.location;
    console.log(restLocation);
    // let clinetLocation =
    let message ="";
    // if(x==0)
    // message = "Im a driver";
    // if (x == 1)
    //   message = `I will go to the resturant at location ${restLocation}`;
    // if (x >= 2)
    //   messag = `I will go to the client at location ${clinetLocation}`;
    let response = {
      message: message,
      order: order,
    };
    res.status(201).json(order);
    x++;
   
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
async function findRest(id) {
  let res = await restTable.findOne({ where: { id: id } });
  return res.location;
}

async function findClient(id) {
  let client = await users.findAll({ where: { id: id } });
  return client.location;
}
module.exports = driverRouter;
