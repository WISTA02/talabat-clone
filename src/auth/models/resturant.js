

'use strict';

const restModel = (sequelize, DataTypes) => 
sequelize.define('resturants', {
  name: {
     type: DataTypes.STRING, 
     required: true },

  type: {
    type: DataTypes.STRING, 
    required: true 
  },
  restaurant_area:{
    type: DataTypes.STRING, 
    required: true 
  },
ratings:{
  type: DataTypes.STRING, 
  required: true 
},
delivery_fee:{
  type: DataTypes.STRING, 
  required: true 
}

},
{timestamps:false});


module.exports = restModel;