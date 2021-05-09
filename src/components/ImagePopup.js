import React from 'react';
import closeIcon from '../images/close-icon.svg';

function ImagePopup(props) {
  return (
    <section
      className={`popup popup-image ${props.isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup-image__container">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup-image__image"
        />
        <h2 className="popup-image__name">{props.card.name}</h2>
        <button
          onClick={props.onClose}
          className="popup__close-button"
          type="button"
        >
          <img src={closeIcon} alt="закрыть" className="popup__close-icon" />
        </button>
      </div>
    </section>
  );
}

export default ImagePopup;
