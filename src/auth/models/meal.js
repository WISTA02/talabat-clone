

'use strict';

const mealModel = (sequelize, DataTypes) => sequelize.define('meals', {
  name: { type: DataTypes.STRING, required: true },
  description: { type: DataTypes.STRING, required: true },
  price:{type:DataTypes.FLOAT(11)},
  rating:{ type: DataTypes.STRING, required: true },
},{timestamps:false});


module.exports = mealModel;

