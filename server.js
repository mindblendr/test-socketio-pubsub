require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const redis = require('socket.io-redis');
io.adapter(redis({ host: process.env.REDIS_PUBSUB_HOST, port: process.env.REDIS_PUBSUB_PORT }));

io.on('connection', (socket) => {
    socket.on('send-message', (payload) => {
        io.emit('receive-message', payload);
    });
});


server.listen(process.env.PORT, () => { console.log('listening on *:' + process.env.PORT); });