import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function clearInputs() {
    setName('');
    setLink('');
  }

  function handleClose() {
    onClose();
    clearInputs();
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });

    clearInputs();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Новое место"
      buttonText="Создать"
    >
      <input
        id="place-name-input"
        type="text"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className="place-name-input-error"></span>
      <input
        id="place-link-input"
        type="url"
        className="popup__input popup__input_type_card-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
