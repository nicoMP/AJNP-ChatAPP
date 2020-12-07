import React, { useState } from 'react';
import { Link } from "react-router-dom";

//join form component
//people must enter their name and the room they want to go to
export default function SignIn() {
  //uses state for the inputs to track the information
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join-container">
      <h1 className="heading">Chat-App</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Join Room</button>
        </Link>
    </div>
  );
}
