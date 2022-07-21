'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./user.js');
const DataCollection=require("./lib/data-collection");
const mealModel=require("./meal");
const orderModel=require("./order");
const restModel=require("./resturant");
const driverModel=require("./drivers")
// const association=require("./x");
// association();
// const models = require('./models.js');
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
const userTable= users(sequelize, DataTypes);

const orderTable=orderModel(sequelize, DataTypes);
const orderCollection=new DataCollection(orderTable);
// 
const mealTable=mealModel(sequelize, DataTypes);
const mealsCollection=new DataCollection(mealTable);

const driverTable=driverModel(sequelize, DataTypes);
const driverCollection=new DataCollection(driverTable);


// restModel
const restTable=restModel(sequelize, DataTypes);
const restCollection=new DataCollection(restTable);

userTable.hasMany(orderTable); //user  many order
orderTable.belongsTo(userTable); // order one user

orderTable.hasMany(mealTable); // order many meals
mealTable.belongsTo(orderTable); // meals one order

restTable.hasMany(mealTable); // rest many meal
mealTable.belongsTo(restTable); // meal one rest

restTable.hasMany(orderTable); // rest many order
orderTable.belongsTo(restTable); // order one rest

driverTable.hasMany(orderTable); //driver many order
orderTable.belongsTo(driverTable); // order one driver

module.exports = {
  db: sequelize,
  users: userTable,
  orderCollection:orderCollection,
  mealsCollection: mealsCollection,
  restCollection: restCollection,
};
