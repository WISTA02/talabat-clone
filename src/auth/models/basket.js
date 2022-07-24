

'use strict';

const basketModel = (sequelize, DataTypes) => sequelize.define('basckets', {
  total_price:{type:DataTypes.FLOAT(11)},
},{timestamps:false});


module.exports = basketModel;