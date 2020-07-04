const express = require('express')
const socket = require('socket.io')
const app = express() //app setup
const port = process.env.PORT || 8000

app.use(express.static('public'));

const server = app.listen(port, () => {
    console.log(`listening to ${port}`);
})

const io = socket(server); //io setup

// Listening for event 'connection' with browser
// Every connection will have a separate socket
io.on('connection', function (socket) {
    console.log("socket connction made");
    socket.on('chat', function (data) {
        //io.sockets is all sockets/connections with server
        io.sockets.emit('chat', data);
    })
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    })
    console.dir(socket)
})