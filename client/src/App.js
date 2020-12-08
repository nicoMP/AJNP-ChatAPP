import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from './components/Join';
import Chat from './components/Chat';
import Disconnect from './components/Disconnect';

import './App.css'
//Main app component
const App = () => {
  return (
    <Router>
      <div className="contain">
        <Route exact path="/" component={Join} />
        <Route path="/chat" component={Chat} />
        <Route exact path="/disconnect" component={Disconnect} />
      </div>
    </Router>
  );
}

export default App;
