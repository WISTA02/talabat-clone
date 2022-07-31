'use strict';

const { BOOLEAN } = require('sequelize');
const sequelize = require('sequelize');

const orderDetailsModel = (sequelize, DataTypes) =>
  sequelize.define(
    'orders',
    {
      all_items: { type: DataTypes.ARRAY(DataTypes.JSONB) },
      status: {
        type: DataTypes.ENUM(
          'Restaurant-is-accepting',
          'Restaurant-is-preparing',
          'Driver-accepted',
          'Out-for-delivery',
          'Delivered',
          'Cancelled'
        ),
        defaultValue: 'Restaurant-is-accepting',
      },
      total_price: { type: DataTypes.FLOAT(11) },
      driver_ID: { type: DataTypes.INTEGER },
      rated:{type:DataTypes.BOOLEAN,defaultValue:false}
    },
    { timestamps: false }
  );

module.exports = orderDetailsModel;
