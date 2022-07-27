'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/`;



const systemConnection = io.connect(host);

setTimeout(() => {
    systemConnection.emit('new-customer',customer );
  
},1000);

