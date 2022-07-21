

'use strict';

const driverModel = (sequelize, DataTypes) => sequelize.define('drivers', {
  name: { type: DataTypes.STRING, required: true },
  age: { type: DataTypes.STRING, required: true },
  car_model: { type: DataTypes.STRING, required: true },
  

},{timestamps:false});


module.exports = driverModel;