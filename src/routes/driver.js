// const driverRouter =require ("../models/index");

const express = require("express");
const { json } = require("express/lib/response");

const { driverCollection } = require("../auth/models/index");
const driverRouter = express.Router();
driverRouter.get("/driver", getAll);
driverRouter.post("/driver", creatRecord);
driverRouter.put("/driver/:id", updating);
driverRouter.delete("/driver/:id", deleting);
driverRouter.get("/driver/:id", getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  try {
    
   validID(req.body.ID);
   validPhoneNum(req.body.phone)

    let newdriver = req.body;
    let newRecored = await driverCollection.create(newdriver);
     res.status(201).json(newRecored);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
///////////select *//////////////////
async function getAll(req, res) {
  let drivers = await driverCollection.read();
  res.status(200).json(drivers);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await driverCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await driverCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.id);
  let recored = await driverCollection.read(id);
  res.status(200).json(recored);
}
function validPhoneNum(phonNum){
  let regex=/^(079||078||077)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;;
if (regex.test(phonNum))
return true;
else
throw new Error("invalid phone number");
}
///function that validate the Jordanian national number/ Identity  (ID)
// [90][0-9]{2} - matches 000 to 999 (year 1900 to year 2099, assuming the date range)
// [12] - matches 1 or 2 for gender
// [0-9]{2} - matches 00 to 99 (assuming city code 00 - 99)
// [0-9]{5} - 5 digit sequence number
//   98610589069 is made up of;
function validID(ID){
let regex=/^[90][0-9]{2}[12][0-9]{2}[0-9]{5}$/;
if (regex.test(ID))
return true;
else
throw new Error("invalid ID");
}

module.exports = driverRouter;
