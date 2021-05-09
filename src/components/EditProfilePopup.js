import React, { useState, useEffect, useContext } from 'react';
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrenUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescreptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <input
        id="profile-name-input"
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="profile-name-input-error"></span>
      <input
        id="profile-about-input"
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_type_about"
        name="about"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescreptionChange}
      />
      <span className="profile-about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
