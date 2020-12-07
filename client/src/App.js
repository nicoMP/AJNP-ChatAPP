import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from './components/Chat';
import Join from './components/Join';


import './App.css'
//Main app component
const App = () => {
  return (
    <Router>
      <div className="contain">
        <Route exact path="/" component={Join} />
        <Route path="/chat" component={Chat} />
      </div>
    </Router>
  );
}

export default App;
