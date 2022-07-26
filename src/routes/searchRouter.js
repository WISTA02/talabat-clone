const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../auth/middleware/bearer");
const role = require("../auth/middleware/role")
const { Sequelize, DataTypes } = require('sequelize');
const Op=Sequelize.Op;
const { restTable,users, mealTable, } = require("../auth/models/index");

const searchRouter = express.Router();
searchRouter.get("/search", search);


async function search(req,res){
if(req.body.resturant){
    
    let rest = await restTable.findAll({where:{  name: {
        [Op.like]: `%${req.body.resturant}%`,
      }}})
      if(rest.length>0)
      res.status(200).json(rest);
      else
      res.status(500).send("There are no restaurants match this name")
    // res.write(JSON.stringify("error"));

}
else
{
    if (req.body.meal){
        console.log("elseeeeeeeeee");
        let meal = await mealTable.findAll({where:{  name: {
            [Op.like]: `%${req.body.meal}%`,
          }}})
          if(meal.length>0)
      res.status(200).json(meal);
      else
      res.status(500).send("There are no meals match this name")
    }
}
}




module.exports = searchRouter;
