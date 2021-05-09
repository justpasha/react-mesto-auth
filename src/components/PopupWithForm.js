import React from 'react';
import closeIcon from '../images/close-icon.svg';

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <form
        className="popup__container"
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate
      >
        <h2 className="popup__heading">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup__save-button">
          {props.buttonText}
        </button>
        <button
          onClick={props.onClose}
          className="popup__close-button"
          type="button"
        >
          <img src={closeIcon} alt="закрыть" className="popup__close-icon" />
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
