'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./user.js');
const DataCollection=require("./lib/data-collection");
const mealModel=require("./meal");
const orderModel=require("./order");
const restModel=require("./resturant");
const driverModel=require("./drivers");
const basketModel=require("./basket") 


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

const basketTable=basketModel(sequelize, DataTypes);
const basketCollection=new DataCollection(basketTable);


// restModel
const restTable=restModel(sequelize, DataTypes);
const restCollection=new DataCollection(restTable);

userTable.hasMany(basketTable); //user  many order
basketTable.belongsTo(userTable); // order one user

// mealTable.hasMany(orderTable); // order many meals
// orderTable.belongsTo(mealTable); // meals one order

restTable.hasMany(mealTable); // rest many meal
mealTable.belongsTo(restTable); // meal one rest

restTable.hasMany(basketTable); //ok
basketTable.belongsTo(restTable); // order one rest

driverTable.hasMany(basketTable); //ok
basketTable.belongsTo(driverTable); // order one driver

userTable.hasMany(basketTable); //ok
basketTable.belongsTo(userTable); 

mealTable.hasMany(orderTable);//ok
orderTable.belongsTo(mealTable);

userTable.hasMany(orderTable);//ok
orderTable.belongsTo(userTable);

basketTable.hasOne(orderTable);
orderTable.belongsTo(basketTable);

module.exports = {
  db: sequelize,
  users: userTable,
  orderCollection:orderCollection,
  mealTable:mealTable,
  orderTable:orderTable,
  driverTable:driverTable,
  driverCollection:driverCollection,
  mealsCollection: mealsCollection,
  restCollection: restCollection,
  basketCollection:basketCollection
};
