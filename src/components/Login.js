import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...data } = loginData;

    onLogin(data);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__heading">Вход</h2>
        <input
          type="email"
          className="login__input"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="login__input"
          name="password"
          placeholder="Пароль"
          value={loginData.password}
          onChange={handleChange}
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
