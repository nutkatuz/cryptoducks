// App.js

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
    this.state = {
      loggedIn: false
    }
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
        <Route exact path="/">
          {this.state.loggedIn 
          ? <Redirect to="/ducks" /> 
          : <Redirect to="/login" />}
        </Route>
      </Switch>
    )
  }
}

export default App;