import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ onLogout, email }) {
  const location = useLocation();
  const history = useHistory();
  const data = {
    path: '',
    text: 'Выйти',
  };
  let isMainPage = false;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (location.pathname === '/') {
    isMainPage = true;
  }

  if (location.pathname === '/signin') {
    data.path = '/signup';
    data.text = 'Регистрация';
  }
  if (location.pathname === '/signup') {
    data.path = '/signin';
    data.text = 'Войти';
  }

  function handleClick() {
    if (isMainPage) {
      onLogout();
      setIsMenuOpen(false);
    } else {
      history.push(data.path);
    }
  }

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="header">
      <div
        className={`header__menu ${
          isMenuOpen && isMainPage ? 'header__menu_opened' : ''
        }`}
      >
        <p className="header__text">{isMainPage ? email : ''}</p>
        <button
          className={`header__button ${
            isMainPage ? 'header__button_type_exit' : ''
          }`}
          onClick={handleClick}
        >
          {data.text}
        </button>
      </div>

      <div className="header__container">
        <img src={logo} alt="лого" className="header__logo" />

        {isMainPage ? (
          <button
            onClick={!isMenuOpen ? handleOpenMenu : handleCloseMenu}
            className={`header__menu-button ${
              isMenuOpen ? 'header__menu-button_type_close' : ''
            }`}
          ></button>
        ) : (
          ''
        )}

        <div
          className={`header__info-container ${
            isMainPage ? 'header__info-container_hidden' : ''
          }`}
        >
          <p className="header__text">{isMainPage ? email : ''}</p>
          <button
            className={`header__button ${
              isMainPage ? 'header__button_type_exit' : ''
            }`}
            onClick={handleClick}
          >
            {data.text}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
