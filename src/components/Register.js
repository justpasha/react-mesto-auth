import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <form className="login__form">
        <h2 className="login__heading">Регистрация</h2>
        <input
          id="place-name-input"
          type="email"
          className="login__input"
          name="email"
          placeholder="Email"
          required
        />
        <input
          id="place-link-input"
          type="password"
          className="login__input"
          name="password"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>
      <div className="login__signin">
        <p className="login__text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/signin" className="login__link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Login;
