"use strict";

const restModel = (sequelize, DataTypes) =>
  sequelize.define(
    "resturants",
    {
      name: { type: DataTypes.STRING, required: true },

      type: { type: DataTypes.STRING, required: true },

      order_path: { type: DataTypes.INTEGER },

      rating: { type: DataTypes.STRING },

<<<<<<< HEAD
      delivery_fee: { type: DataTypes.STRING},

      location:{type:DataTypes.JSONB}
=======
      delivery_fee: { type: DataTypes.FLOAT(11)},

      ownerId: { type: DataTypes.STRING},
>>>>>>> e2be1765ce5e141cf115a8c04d4c40d718d46949
    },
    { timestamps: false }
  );

module.exports = restModel;
