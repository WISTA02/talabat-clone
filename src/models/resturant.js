

'use strict';

const restModel = (sequelize, DataTypes) => sequelize.define('resturants', {
  name: { type: DataTypes.STRING, required: true },
},{timestamps:false});


module.exports = restModel;