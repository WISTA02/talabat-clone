

'use strict';

const orderModel = (sequelize, DataTypes) => sequelize.define('orders', {
  total_price:{type:DataTypes.FLOAT(11)},
},{timestamps:false});


module.exports = orderModel;