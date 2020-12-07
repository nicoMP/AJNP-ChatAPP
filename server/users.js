//create array of users
const users = [];

const addUser = ({ id, name, room }) => {
  //trim and lowercase names and rooms to identify users
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //check if user aready exists in specific room
  const existingUser = users.find((user) => user.room === room && user.name === name);

  //checks if username and room were provided and returns error if not
  if(!name && !room) return { error: 'Username and room are required.' };
  //returns error if user exists
  if(existingUser) return { error: 'Username is taken.' };

  //create user object
  const user = { id, name, room };
  //save user to array
  users.push(user);
  //return user object
  return { user };
}

const removeUser = (id) => {
  //find index of user with id
  const index = users.findIndex((user) => user.id === id);
  //remove user at index
  if(index !== -1) return users.splice(index, 1)[0]; 
}

//get user object using id from array
const getUser = (id) => users.find((user) => user.id === id);
//get all users with same room property
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };