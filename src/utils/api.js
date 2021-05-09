class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this._user = 'users/me';
    this._cards = 'cards';
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(console.log(`Произошла ошибка ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/${this._cards}`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/${this._user}`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  editProfileInfo(data) {
    return fetch(`${this.baseUrl}/${this._user}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  createCard(data) {
    return fetch(`${this.baseUrl}/${this._cards}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/${this._cards}/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this.baseUrl}/${this._cards}/likes/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
      }).then(this._checkResponse);
    } else {
      return fetch(`${this.baseUrl}/${this._cards}/likes/${cardId}`, {
        method: 'PUT',
        headers: this.headers,
      }).then(this._checkResponse);
    }
  }

  changeAvatar(data) {
    return fetch(`${this.baseUrl}/${this._user}/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '14241259-6e5d-4497-966c-a550cda05f4a',
    'Content-Type': 'application/json',
  },
});

export default api;
