import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Main}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
