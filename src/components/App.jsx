// App.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
// импортируем компоненты приложения
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
// импортируем CSS
import './styles/App.css';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Switch>
        <Route path="/ducks">
          <Ducks />
        </Route>
        <Route path="/my-profile">
          <MyProfile />
        </Route>
        <Route path="/login">
          <div className="loginContainer">
            <Login  />
          </div>
        </Route>
        <Route path="/register">
          <div className="registerContainer">
            <Register />
          </div>
        </Route>
      </Switch>
    )
  }
}

export default App;