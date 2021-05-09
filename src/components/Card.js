import React from 'react';
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import deleteIcon from '../images/delete-icon.svg';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrenUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? 'element__delete-button_visible' : ''
  }`;

  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? 'element__like-button_active' : ''
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDelete}>
        <img src={deleteIcon} alt="удалить" className="element__delete-icon" />
      </button>
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="element__image"
      />
      <div className="element__name-container">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
