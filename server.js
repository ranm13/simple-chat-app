const express = require('express');
const socket = require('socket.io');
const app = express();

const PORT = 4000
const server = app.listen(process.env.PORT || PORT, function(){
    console.log("server is running");
});

app.use(express.static('dist'));

const io = socket(server);
io.on('connection', (socket) => {

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
