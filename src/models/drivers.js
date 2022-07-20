

'use strict';

const driverModel = (sequelize, DataTypes) => sequelize.define('drivers', {
  name: { type: DataTypes.STRING, required: true },
},{timestamps:false});


module.exports = driverModel;