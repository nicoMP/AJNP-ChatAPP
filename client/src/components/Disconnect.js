import React from 'react';
import { Link } from 'react-router-dom';

const Disconnect = () => {
    return (
        <div className="disconnect-card" >
            <h1>The server has been shut down</h1>
            <Link className="return-home" to="/">Return to home</Link>
        </div>
    )
}

export default Disconnect;
