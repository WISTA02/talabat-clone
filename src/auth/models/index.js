'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./user.js');
const DataCollection = require("./lib/data-collection");
const mealModel = require("./meal");
const orderModel = require("./order");
const restModel = require("./resturant");


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const userTable = users(sequelize, DataTypes);



const orderTable = orderModel(sequelize, DataTypes);
const orderCollection = new DataCollection(orderTable);
// 
const mealTable = mealModel(sequelize, DataTypes);
const mealsCollection = new DataCollection(mealTable);

const restTable = restModel(sequelize, DataTypes);
const restCollection = new DataCollection(restTable);

////////////relations/////////////////////////////////////

restTable.hasMany(mealTable); // rest many meal
mealTable.belongsTo(restTable); // meal one rest

userTable.hasMany(restTable);
 


restTable.belongsTo(userTable);

restTable.hasMany(orderTable); //ok
orderTable.belongsTo(restTable); // order one rest


userTable.hasMany(orderTable);
orderTable.belongsTo(userTable);

// sequelize.dropAllSchemas;
console.log("*********************************", sequelize.showAllSchemas());
// sequelize.sync({alter:true}).then(()=>{}).catch((e)=>console.log(e)) 
module.exports = {
  db: sequelize,
  users: userTable,
  orderCollection: orderCollection,
  mealTable: mealTable,
  orderTable: orderTable,
  mealsCollection: mealsCollection,
  restCollection: restCollection,

  restTable:restTable

};
