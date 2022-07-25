"use strict";

const express = require("express");

const bearer = require("../auth/middleware/bearer")

const { orderCollection } = require('../auth/models/index');
const sequelize = require("sequelize");

const orderRouter = express.Router();
orderRouter.get('/order', handleGetAll);
orderRouter.get('/order/:id', handleGetOne);
orderRouter.post('/order', bearer, handleCreate);
orderRouter.put('/order/:id', handleUpdate);
orderRouter.delete('/order/:id', handleDelete);



async function handleGetAll(req, res) {
    let allOrders = await orderCollection.read();
    res.status(200).json(allOrders);
}

async function handleGetOne(req, res) {
    const orderId = parseInt(req.params.id);
    let order = await orderCollection.read(orderId)
    res.status(200).json(order);
}

async function handleCreate(req, res) {
    console.log("//////////////////", req.user);
    let newOrder = {
        all_items: req.body.all_items,
        status: req.body.status,
        total_price: req.body.total_price,
        driver_ID: req.body.driver_ID,
        userId: req.user.id
    };
    let order = await orderCollection.create(newOrder);
    res.status(201).json(order);
}

async function handleUpdate(req, res) {
    const orderId = parseInt(req.params.id);
    const updatedOrder = req.body;
    let order = await orderCollection.read(orderId);
    if (order) {
        let updated = await order.update(updatedOrder);
        res.status(201).json(updated);
    } else {
        res.status(404);
    }
}

async function handleDelete(req, res) {
    let orderId = parseInt(req.params.id);
    let order = await orderCollection.delete(orderId);
    res.status(204).json(order)
}




module.exports = orderRouter;