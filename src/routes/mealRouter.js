'use strict';

const express = require('express');
const bearer = require('../auth/middleware/bearer');
const acl = require('../auth/middleware/acl');
const router = express.Router();


router.get('/meal', bearer, acl('read'), handleGetAll);
router.get('/meal/:id', bearer, acl('read'), handleGetOne);
router.post('/meal', bearer, acl('create'), handleCreate);
router.put('/meal/:id', bearer, acl('update'), handleUpdate);
router.delete('/meal/:id', bearer, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
    let allRecords = await req.model.read();
    res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let theRecord = await req.model.read(id)
    res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(201).json(updatedRecord);
}

async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(204).json(deletedRecord);
}


module.exports = router;