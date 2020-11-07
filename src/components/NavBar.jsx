import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.js";
import "./styles/NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Logo />
      </div>
      <ul className="navbar__nav">
        <li>
          <Link to="ducks" className="navbar__link">
            Утки
          </Link>
        </li>
        <li>
          <Link to="my-profile" className="navbar__link">
            Мой профиль
          </Link>
        </li>
        <li>
          <button className="navbar__link navbar__button">Выйти</button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
// Для реализации выхода из системы нужно удалить JWT-токен из localStorage и переадресовать пользователя на страницу /login. Поскольку NavBar — функциональный компонент, воспользуемся «Реакт-хуком» useHistory: