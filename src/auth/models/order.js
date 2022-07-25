



'use strict';


const sequelize = require("sequelize");

const orderDetailsModel = (sequelize, DataTypes) => sequelize.define('orders', {
    all_items:{type:DataTypes.STRING},
    status:{type:DataTypes.ENUM("restaurant-is-accepting",
        "restaurant-is-preparing",
        "driver-accepted",
        "Out-for-Delivery",
        "Delivered",
        "Cancelled")},
    total_price:{type:DataTypes.FLOAT(11)},
    driver_ID:{type:DataTypes.INTEGER}
},{timestamps:false});


module.exports = orderDetailsModel;