import React from 'react';
import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';
import closeIcon from '../images/close-icon.svg';

function NoticePopup({ isOpen, onClose, data }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_notice">
        <img
          src={data.type === 'success' ? successIcon : errorIcon}
          className="popup__image"
          alt="иконка"
        />
        <p className="popup__heading popup__heading_type_notice">{data.text}</p>
        <button
          onClick={onClose}
          className="popup__close-button popup__close-button_type_notice"
          type="button"
        >
          <img src={closeIcon} alt="закрыть" className="popup__close-icon" />
        </button>
      </div>
    </section>
  );
}

export default NoticePopup;
