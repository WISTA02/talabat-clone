'use strict';

const express = require('express');
const bearer = require('../auth/middleware/bearer');
const router = express.Router();

const { mealsCollection } = require('../auth/models/index');

router.get('/meal', bearer, handleGetAll);
router.get('/meal/:id', bearer, handleGetOne);
router.post('/meal', bearer, handleCreate);
router.put('/meal/:id', bearer, handleUpdate);
router.delete('/meal/:id', bearer, handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await mealsCollection.read();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = parseInt(req.params.id);
  let theRecord = await mealsCollection.read(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await mealsCollection.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await mealsCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  } else {
    res.status(403).send('update error');
  }
}

async function handleDelete(req, res) {
  let id = parseInt(req.params.id);
  let deletedRecord = await mealsCollection.delete(id);
  res.status(204).json(deletedRecord);
}

module.exports = router;
