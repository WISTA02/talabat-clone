

'use strict';

const driverModel = (sequelize, DataTypes) => sequelize.define('drivers', {
  name: { type: DataTypes.STRING, required: true,allowNull: false },
  ID:{type: DataTypes.BIGINT(11), required: true,allowNull: false,unique: true},
  phone:{type: DataTypes.BIGINT(11), required: true,allowNull: false}
},{timestamps:false});


module.exports = driverModel;