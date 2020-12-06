const users = [];
 
//join user to chat
function userJoin(id, username, room){//joins user to chat room
    const user = {id, username, room};//createss a user from those parameters
    users.push(user);
    return user;
}//this adds the user to the array of object users

//get current user

function getCurrentUser(id){
    return users.find(user => user.id === id);//retrieve current user id is same as socketid
}
function userRemoval(id){
    const i = users.findIndex(user => user.id === id);//this finds a user with matching id 
    if(i != -1){
        return users.splice(i, 1)[0];//this removes it and returns the id
    }
}
function getUserInRoom(room){
    return users.filter(user => user.room == room);//returns an array of only users that are in the room
}

module.exports = {
userJoin,
getCurrentUser,
userRemoval,
getUserInRoom
}