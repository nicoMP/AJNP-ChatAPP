const express = require('express');
const http = require('http');
const path = require("path");
const socketIO = require('socket.io');
const { isNullOrUndefined } = require('util');
const messageFormatter = require('./Utilities/msg');//import message formatter that gives username name and time
const {userJoin, getCurrentUser, getUserInRoom, userRemoval} = require('./Utilities/users');//import message formatter that handles users


const app = express();
const server = http.createServer(app);//creating server from express app
const io = socketIO(server);//binds server to socket.io







//sets static folder
app.use(express.static(path.join(__dirname, "public")));//allows for you to use the fronmt end folder attach the name of the folder here along other activated at every http request
//process.env returns the user environment here were requesting port specifically to see if the env has a predefine one
const PORT = process.env.PORT || 3001;
server.listen(PORT); //attaches port and outputs message on server cosnole to show it is running


//runs on new connection
io.on('connection', socket =>{
   
    //joins room
    socket.on('join', ({username, room}) => {//needs the name of the room and username
    const user = userJoin(socket.id,username, room);//joining user to a room
    socket.join(user.room); 
    //welcomes new user
    socket.emit('message', messageFormatter('ChatterBot', 'Welcome to AJNP ChatApp'));//emit for single client
    socket.broadcast.to(user.room).emit('message', messageFormatter('ChatterBot', `${user.username} Joined Chat`));//this is to everybody but the current user
    //runs when client disconnects
    io.to(user.room).emit('roomUsers', {//sends object containting room and user along signal roomsers
        room: user.room,
        users: getUserInRoom()//gets users in room
    });
    });
    
   
    socket.on('disconnect', () => {//this signal should be sent everytime you want to terminate the server 
        const user = userRemoval(socket.id);
        if(user){
        io.to(user.room).emit("message", messageFormatter("ChatterBot",`${user.username} Has Left The Chat`));}
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getUserInRoom()//gets users in room
        })
    });
   
    //listen for chat message
    socket.on('cMessage', (message)=>{//this activates the socket when a signal of cMessage is sent
        const user = getCurrentUser(socket.id);//were calling current user here so that it can let chatbot know who left
        //once chat message is recieved it's emited again bellow to all users in chat
        io.to(user.room).emit('message', messageFormatter(user.username, message));//sends a message specifically to a room
    });

    
    
});

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  readline.question(`Server running on Poer: ${PORT} \nPress Enter To Quit`, name => {
    console.log("shutting down");
    io.emit("ShutDown"); //emits shutdown signal that client can recieve to terminate server
    readline.close();
    return process.exit(0);//kills the server
  });  