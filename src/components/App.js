import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import NoticePopup from './NoticePopup';
import api from '../utils/api';
import * as apiAuth from '../utils/apiAuth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isNoticePopupOpen, setIsNoticePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [noticePopupData, setNoticePopupData] = useState({
    type: '',
    text: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  //загрузка данных
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, []);

  //обработчики карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(
          cards.filter((c) => {
            return c._id !== card._id;
          })
        );
      })
      .catch((err) => console.log(err));
  }

  //открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsCardPopupOpen(false);
    setIsNoticePopupOpen(false);
  }

  //обновление данных
  function handleUpdateUser(data) {
    api
      .editProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //аутентификацию
  function handleRegister(data) {
    return apiAuth
      .register(data)
      .then(() => {
        history.push('/singin');
        setIsNoticePopupOpen(true);
        setNoticePopupData({
          type: 'success',
          text: 'Вы успешно зарегистрировались!',
        });
      })
      .catch((err) => {
        console.log(err);
        setIsNoticePopupOpen(true);
        setNoticePopupData({
          type: 'error',
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }

  function handleLogin(data) {
    return apiAuth
      .authorize(data)
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        tokenCheck();
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }

  function tokenCheck() {
    if (!localStorage.getItem('jwt')) {
      return;
    }

    const jwt = localStorage.getItem('jwt');
    apiAuth
      .getContent(jwt)
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  return (
    <div className="page">
      <CurrenUserContext.Provider value={currentUser}>
        <Header onLogout={handleLogout} email={email} />
        <Switch>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            card={selectedCard}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />

        <ImagePopup
          isOpen={isCardPopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <NoticePopup
          isOpen={isNoticePopupOpen}
          onClose={closeAllPopups}
          data={noticePopupData}
        />
      </CurrenUserContext.Provider>
    </div>
  );
}

export default App;
