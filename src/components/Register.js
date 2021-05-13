import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onRegister }) => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...data } = registerData;

    onRegister(data);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__heading">Регистрация</h2>
        <input
          type="email"
          className="login__input"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="login__input"
          name="password"
          placeholder="Пароль"
          value={registerData.password}
          onChange={handleChange}
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
