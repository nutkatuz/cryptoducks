// Login.js

import React from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "./Logo.js";
import * as duckAuth from "../duckAuth.js";
import "./styles/Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      return; // добавили логин
    }
    duckAuth
      .authorize(this.state.username, this.state.password)// здесь авторизуем пользователя
      .then((data) => {
        if (data.jwt) {  // далее проверяем токен
          this.setState({ username: '', password: '' }, () => {
            this.props.handleLogin(); // обновляем стейт внутри App.js
            this.props.history.push('/ducks');  // наконец, перенаправляем пользователя на страницу `/ducks`
          });
        }
      })
      .catch((err) => console.log(err)); // если пользователь не найден
  }
  // Очистите стейт-переменную, применив this.setState. Помните, что вы можете использовать анонимную колбэк-функцию в качестве второго аргумента this.setState.
  // Внутри колбэка используйте метод handleLogin, который определяется и передаётся как пропс из App.js в Login.js.
  // Также внутри колбэка перенаправляйте пользователя на /ducks методом history.push. Напомним, что получить доступ к объекту history поможет HOC-компонент withRouter.
  render() {
    return (
      <div className="login">
        <Logo title={"CryptoDucks"} />
        <p className="login__welcome">
          Это приложение содержит конфиденциальную информацию. Пожалуйста,
          войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <label for="username">Логин:</label>
          <input
            id="username"
            required
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label for="password">Пароль:</label>
          <input
            id="password"
            required
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">
              Войти
            </button>
          </div>
        </form>

        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/register" className="signup__link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
