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
const foodCollection=new DataCollection(mealTable);

const driverTable=driverModel(sequelize, DataTypes);
const driverCollection=new DataCollection(driverTable);


restModel
const restTable=restModel(sequelize, DataTypes);
const restCollection=new DataCollection(restTable);

userTable.hasMany(orderTable);
orderTable.belongsTo(userTable);

orderTable.hasMany(mealTable);
mealTable.belongsTo(orderTable);

restTable.hasMany(mealTable);
mealTable.belongsTo(restTable);

restTable.hasMany(orderTable);
orderTable.belongsTo(restTable);

driverTable.hasMany(orderTable);
orderTable.belongsTo(driverTable);

module.exports = {
  db: sequelize,
  users: userTable,
  orderCollection:orderCollection,
  foodCollection:foodCollection,
  mealTable:mealTable,
  orderTable:orderTable,
  driverTable:driverTable,
  driverCollection:driverCollection
};
