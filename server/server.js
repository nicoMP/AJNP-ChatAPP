const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
//import user module
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

//create port for app to run
const PORT = process.env.PORT || 5000;

//create express app
const app = express();
//create server
const server = http.createServer(app);
//create server socket
const io = socketio(server);

app.use(cors());
//index server endpoint
app.get("/", (req, res) => {
  res.send("Server running");
});

//listen for connections to socket
io.on('connect', (socket) => {
  //listen for join events that are emitted to socket
  socket.on('join', ({ name, room }, callback) => {
    //check if join payload has required info and create user object
    const { error, user } = addUser({ id: socket.id, name, room });

    //if error was returned send back error
    if(error) return callback(error);

    //creates channel that connects different sockets
    socket.join(user.room);

    //on joining, emmit message to client
    socket.emit('message', { user: 'admin', text: `${user.name} has joined ${user.room}`});
    //broadcast emits to all client sockets except for the new one
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has entered the chat` });
    //emit room data to client
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  //listen for incoming messages
  socket.on('sendMessage', (message, callback) => {
    //get user based off socket id which is unique to client
    const user = getUser(socket.id);
    //emit message to the sockets in the artificial room
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  //listen for disconnect events
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    //inform other users of disconnect
    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

//start server on port
server.listen(PORT, () => console.log(`Server has started.`));