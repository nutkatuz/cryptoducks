import React from "react";// { Button } 
import { Link, withRouter } from 'react-router-dom';
import Logo from "./Logo.js";
import "./styles/Register.css";
import * as duckAuth from "../duckAuth.jsx";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) { // логикa обработки формы регистрации, .then -- Пользователь должен быть переадресован, только если форма регистрации заполнена правильно и отправлена
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      let { username, password, email } = this.state;
      duckAuth.register(username, password, email)
      .then((res) => {
        if(res){
          this.setState({
            message: ''
          }, () => {
            this.props.history.push('/login');
          })
        } else {
          this.setState({
            message: 'Что-то пошло не так!'
          })
        }
      });
    }
  }

  render() {
    return (
      <div className="register">
        <Logo title={"CryptoDucks"} />
        <p className="register__welcome">Please register.</p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label for="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label for="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label for="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label for="confirmPassword">Confirm password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
          <div className="register__button-container">
            <button type="submit" className="register__link">
              Sign up
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>Already a member?</p>
          <Link to="login" className="register__login-link">
            Log in here
          </Link>
        </div>
      </div>
    );
  }
}

// изменим последнюю строку в файле Register.js
export default withRouter(Register);
//Теперь компонент Register обёрнут в HOC-компонент. Он сможет получить доступ к объекту history в props. Объект history позволяет использовать метод push. В качестве аргумента он принимает путь, на который мы перенаправляем пользователя. В нашем случае — '/login'.