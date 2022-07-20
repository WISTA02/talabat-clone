// const sequelize = require('sequelize');
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

///requier models
const users=require("./user");
const orderModel=require("./order");
const mealModel=require("./meal");
const restModel=require("./resturant");

//sequlize
const sequelize = new Sequelize("postgres://samah:1234@localhost:5432/d");
const customer = users(sequelize,DataTypes);
const order = orderModel(sequelize,DataTypes);
const meals=mealModel(sequelize,DataTypes);
const resturants=restModel(sequelize,DataTypes);


//relations
customer.hasMany(order);
order.belongsTo(customer);

order.hasMany(meals);
meals.belongsTo(order);

resturants.hasMany(meals);
meals.belongsTo(resturants);

resturants.hasMany(order);
order.belongsTo(resturants);


////////////////add recored to order table/////////////////////
// let users1,orders;
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     // customer.bulkCreate([
//     //   {
//     //     username: "ahmad",
//     //   },
     
//     // ]);
//     // order.bulkCreate([
//     //   {
//     //     name: "burger",
//     //   },
//     //   {
//     //     name: "sushi",
//     //   },
//     // ]);
//     // return customer.findOne({where:{name:"samah"}})
//   })
// //   then((data)=>{
// // users1=data;
// // return order.findAll();
// //   }).then((data)=>{

// // orders=data;
// // users1.addOrder(orders);

// //   })
//   .catch();
