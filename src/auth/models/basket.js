

'use strict';

const basketModel = (sequelize, DataTypes) => sequelize.define('baskets', {
    num_of_items:{type:DataTypes.INTEGER},
    total_price:{type:DataTypes.FLOAT(11)},
},{timestamps:false});


module.exports = basketModel;