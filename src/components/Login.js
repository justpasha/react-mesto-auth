import React from 'react';

const Login = () => {
  return (
    <div className="login">
      <form className="login__form">
        <h2 className="login__heading">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
