



'use strict';

const orderDetailsModel = (sequelize, DataTypes) => sequelize.define('orders', {
    num_of_items:{type:DataTypes.INTEGER},
    total_price:{type:DataTypes.FLOAT(11)},
},{timestamps:false});


module.exports = orderDetailsModel;