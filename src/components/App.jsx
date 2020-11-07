// App.js

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// импортируем компоненты приложения
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute'; // импортируем HOC
import * as duckAuth from "../duckAuth.js";
import './styles/App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
    this.tokenCheck = this.tokenCheck.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.tokenCheck(); // проверить этот токен пользователя!
  };

  handleLogin(e){
      e.preventDefault();
    this.setState({
      loggedIn: true
    })
  }

  tokenCheck () { // если у пользователя есть токен в localStorage, эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt){ // проверим есть ли jwt токен в локальном хранилище браузера
      duckAuth.getContent(jwt).then((res) => {
        if (res){ // здесь можем получить данные пользователя!
          const userData = {
            username: res.username,
            email: res.email
          }
                  // поместим их в стейт внутри App.js
          this.setState({
            loggedIn: true,
            userData
          }, () => {
            this.props.history.push("/ducks");
          });
        }
      });
    }
  }

  render(){
    return (
      <Switch>
                {/* ниже разместим защищённые маршруты */}
                {/* и передадим несколько пропсов: loggedIn, path, component */}
        <ProtectedRoute path="/ducks" loggedIn={this.state.loggedIn} component={Ducks} />
        <ProtectedRoute path="/my-profile" loggedIn={this.state.loggedIn} userData={this.state.userData} component={MyProfile} />
        <Route path="/login">
          <div className="loginContainer">
            <Login handleLogin={this.handleLogin} />
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