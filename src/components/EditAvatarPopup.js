import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const valueRef = useRef();

  function handleClose() {
    onClose();
    valueRef.current.value = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const avatarData = valueRef.current.value;

    onUpdateAvatar({
      avatar: avatarData,
    });

    valueRef.current.value = '';
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        id="avatar-link-input"
        type="url"
        className="popup__input popup__input_type_card-link"
        name="avatar"
        placeholder="Ссылка на картинку"
        ref={valueRef}
        required
      />
      <span className="avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
