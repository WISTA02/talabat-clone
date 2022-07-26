"use strict";

const restModel = (sequelize, DataTypes) =>
  sequelize.define(
    "resturants",
    {
      name: { type: DataTypes.STRING, required: true },

      type: { type: DataTypes.STRING, required: true },

      order_path: { type: DataTypes.INTEGER },


      rating: { type: DataTypes.STRING },

      delivery_fee: { type: DataTypes.FLOAT(11)},

    },
    { timestamps: false }
  );

module.exports = restModel;
