const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../auth/middleware/bearer");
const role = require("../auth/middleware/role")

const { users } = require("../auth/models/index");

const locationRouter = express.Router();
locationRouter.get("/location", bearer, updateLocation);
async function updateLocation(req,res){
let location=req.body.location;
let updated = await users.update(
    { location:location },
    { where: { id: req.user.id } }
  );
  let user = await users.findOne({ where: { id: req.user.id } });
  res.status(200).json(user)
}


module.exports = locationRouter;