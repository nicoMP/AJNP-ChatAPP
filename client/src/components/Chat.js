import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

//URL endpoint for the socket app
const URL = 'http://ec2-3-94-207-224.compute-1.amazonaws.com:5000';

let socket;

//main chat component
const Chat = ({ location }) => {
  //sets state
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  let history = useHistory();

  //simulate lifecycle methods using hook
  //runs code everytime dependancies experience change
  //this hook is called on loading the component
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    //connects to server
    socket = io(URL);
    //sets state
    setRoom(room);
    setName(name)
    //emits join event to server with user info as payload
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [URL, location.search]);
  
  useEffect(() => {
    //listens for message event for incoming messages
    socket.on('message', message => {
      //adds incoming messages to messages array in state
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("ShutDown", () => {
      window.location.href = '/disconnect';
    })
}, []);
//send message method
  const sendMessage = (event) => {
    //prevents page reload
    event.preventDefault();
    //if the message state contains text emits the sendMessage event
    //sends a payload with the message text
    //the uses callback to reset text
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="chat-box">
      <InfoBar room={room} />
      <div className="chat">
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
