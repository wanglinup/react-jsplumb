import React,{Component} from 'react';
import './App.css';
import Home from './components/Home';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
function App() {
  return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
  );
}

export default App;
