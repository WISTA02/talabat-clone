// "use strict";

// const { request } = require("express");
// const express = require("express");
// const resturantRouter =express.Router();
// const acl =require('../auth/middleware/acl');
// const bearer = require("../auth/middleware/bearer");
// const {resturant}=require('../auth/models/index');


// resturantRouter.get('/:model', bearer,acl('read'),handleGetAll);
// // resturantRouter.get('/resturant/:id', bearer, acl('read'), handleGetOne);
// // resturantRouter.post('/resturant', bearer, acl('create'), handleCreate);
// // resturantRouter.put('/resturant/:id', bearer, acl('update'), handleUpdate);
// // resturantRouter.delete('/resturant/:id', bearer, acl('delete'), handleDelete);



// async function handleGetAll(req, res) {
//   console.log("**********************************");
//   let allRecords = await req.model.get();
//   res.status(200).json(allRecords);
//   }

//   // async function handleGetOne(req, res) {
//   //   const id = req.params.id;
//   //   let theRecord = await req.model.get(id)
//   //   res.status(200).json(theRecord);
//   // }
  
//   // async function handleCreate(req, res) {
//   //   let obj = req.body;
//   //   let newRecord = await req.model.create(obj);
//   //   res.status(201).json(newRecord);
//   // }
  
//   // async function handleUpdate(req, res) {
//   //   const id = req.params.id;
//   //   const obj = req.body;
//   //   let updatedRecord = await req.model.update(id, obj)
//   //   res.status(201).json(updatedRecord);
//   // }
  
//   // async function handleDelete(req, res) {
//   //   let id = req.params.id;
//   //   let deletedRecord = await req.model.delete(id);
//   //   res.status(204).json(deletedRecord);
//   // }
  



// module.exports = resturantRouter;