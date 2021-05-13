import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ onLogout, email }) {
  const location = useLocation();
  const history = useHistory();
  const data = {
    path: '',
    text: 'Выйти',
  };

  if (location.pathname === '/signin') {
    data.path = '/signup';
    data.text = 'Регистрация';
  }
  if (location.pathname === '/signup') {
    data.path = '/signin';
    data.text = 'Войти';
  }

  function handleClick() {
    if (location.pathname === '/') {
      onLogout();
    } else {
      history.push(data.path);
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
      <div className="header__info-container">
        <p className="header__text">{location.pathname === '/' ? email : ''}</p>
        <button
          className={`header__button ${
            location.pathname === '/' ? 'header__button_type_exit' : ''
          }`}
          onClick={handleClick}
        >
          {data.text}
        </button>
      </div>
    </header>
  );
}

export default Header;
