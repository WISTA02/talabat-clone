'use strict';

'use strict';

const express = require('express');
const { mealTable } = require('../auth/models/index');
const restaurantMealRouter = express.Router();

restaurantMealRouter.get('/rest/:id', handleGetAll);

async function handleGetAll(req, res) {
  let restId = req.params.id;
  let meals = await mealTable.findAll({ where: { resturantId: restId } });
  res.status(200).json(meals);
}

module.exports = restaurantMealRouter;
