import React, { useState, useEffect } from 'react';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';


import './App.css';
import MainGrid from './components/layout/MainGrid';

function App() {

  return (
    <Router>
      <>
        <div>
          <>
            <div id="header">
              {/* <NavBar/> */}
            </div>
            <MainGrid />
          </>
        </div>
      </>
    </Router>
  );
}

export default App;
