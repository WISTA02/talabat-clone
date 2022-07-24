

'use strict';

const restModel = (sequelize, DataTypes) => 
sequelize.define('resturants', {
  name: {
     type: DataTypes.STRING, 
     required: true },

 
  restaurant_area:{
    type: DataTypes.STRING, 
    required: true 
  },

order_path:{type: DataTypes.INTEGER,}
},
{timestamps:false});


module.exports = restModel;