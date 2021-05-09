import React, { useContext } from 'react';
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import avaEditIcon from '../images/edit-avatar-icon.svg';
import editButtonIcon from '../images/edit-button-img.svg';
import addButtonIcon from '../images/add-button-img.svg';

function Main(props) {
  const currentUser = useContext(CurrenUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar-container"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <button
            onClick={props.onEditAvatar}
            className="profile__avatar-button"
          >
            <img
              src={avaEditIcon}
              alt="изменить аватар"
              className="profile__avatar-icon"
            />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__edit-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"
            >
              <img
                src={editButtonIcon}
                alt="редактировать"
                className="profile__edit-button-image"
              />
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
        >
          <img
            src={addButtonIcon}
            alt="добавить"
            className="profile__add-button-image"
          />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
