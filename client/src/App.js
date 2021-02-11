import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import {Switch, Route, BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" component={Main}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
