import React, { useState, useEffect } from 'react';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';


import './App.css';
import MainGrid from './components/layout/MainGrid';
import Pokemon from './components/pokedata/Pokemon';

function App() {

  return (
    <Router>
      <>
        <div>
          <>
            <div id="header">
              {/* <NavBar/> */}
            </div>
            <Switch>
              <Route exact path = "/" component={MainGrid} />
              <Route exact path = "/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
          </>
        </div>
      </>
    </Router>
  );
}

export default App;
