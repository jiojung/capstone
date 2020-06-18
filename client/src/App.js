import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Switch>
        <Route path='/' component={Main}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
