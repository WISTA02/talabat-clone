'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const ioServer = require('socket.io')(PORT);



ioServer.on('connection', (socket) => {
    console.log('connected ', socket.id);


    socket.on("new-customer", (payload) =>{
    console.log("new customer");
    });
});