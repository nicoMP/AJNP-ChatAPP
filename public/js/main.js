const socket = io();
const cForm = document.getElementById('chat-form');//this gets the chat form so we can use it
const chatMessages =  document.querySelector('.chat-messages');

//get username and room url make
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
//join chatroom
socket.emit('join', {username, room});

socket.on('message', message => {
  console.log(message);
  outputToChat(message); 
  //everytime new messages scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
//input handler
cForm.addEventListener('submit', (f)=>{
  f.preventDefault();//prevents it from default behaviour of creating a file
  const message = f.target.elements.msg.value;//were getting the value of the element msg which is in chat form allows us to get user input
  //sends message to the server
  f.target.elements.msg.value = "";//clears input
  socket.emit('cMessage', message);
});
//this function outputs message to the DOM
function outputToChat(message){
  const div = document.createElement('div');//create divideer
  div.classList.add('message');
  div.innerHTML = '<p class = "meta">' + message.username + '<span>' + message.time + '</span></p> <class = "text">' + message.text + '</p>';
  document.querySelector('.chat-messages').appendChild(div);
} 