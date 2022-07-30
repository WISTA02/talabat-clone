"use strict";

const restModel = (sequelize, DataTypes) =>
  sequelize.define(
    "resturants",
    {
      name: { type: DataTypes.STRING, required: true },

      type: { type: DataTypes.STRING, required: true },

      order_path: { type: DataTypes.INTEGER },

      rating: { type: DataTypes.FLOAT(11) ,defaultValue:0.0},

      delivery_fee: { type: DataTypes.STRING},

      location:{type:DataTypes.JSONB}
    },
    { timestamps: false }
  );

module.exports = restModel;
