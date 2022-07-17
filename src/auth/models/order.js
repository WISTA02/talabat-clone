

'use strict';

const orderModel = (sequelize, DataTypes) => sequelize.define('orders', {
  foods: { type: DataTypes.STRING, required: true },
  total:{type:DataTypes.FLOAT(11)},
},{timestamps:false});


module.exports = orderModel;