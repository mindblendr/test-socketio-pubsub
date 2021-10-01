require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const redis = require('socket.io-redis');
try {
    io.adapter(redis({ host: process.env.REDIS_PUBSUB_HOST, port: process.env.REDIS_PUBSUB_PORT, timeout: 5000 }));
} catch (error) {
    console.log(error);
}

io.on('connection', (socket) => {
    socket.on('send-message', (payload) => {
        io.emit('receive-message', payload);
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


server.listen(process.env.PORT, () => { console.log('listening on *:' + process.env.PORT); });