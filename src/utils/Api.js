import {
  cardSrcInput,
  cardNameInput,
  avatarUrlinp,
  nameInput,
  jobInput,
} from "../utils/Variables.js";

export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Получение информации о пользователе с сервера
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Редактирование аватара
  editAvatar(data) {
    return fetch (`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        //avatar: avatarUrlinp.value
        avatar: data.avatarUrl,
      })
    }).then(this._checkResponse);
  };

  //Редактирование профиля
  editUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
       // name: nameInput.value,
        //about: jobInput.value,
        name: data.name,
        about: data.status,
      }),
    }).then(this._checkResponse);
  }

  //Добавление новой карточки
  apiAddNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        //name: cardNameInput.value,
       // link: cardSrcInput.value,
        name: data.cardname,
        link: data.cardsrc,
      }),
    }).then(this._checkResponse);
  }

  //Лайки
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status},${res.statusTex}`);
  }
}
