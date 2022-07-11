import {
  cardSubmitBtn,
  profileName,
  profileStatus,
  profileAvatar,
  cardSrcInput,
  cardNameInput,
  avatarUrlinp,
  nameInput,
  jobInput,
} from "./variables.js";
import { initialCards } from "./Card.js";
import { renderLoading } from "./modal";

export class Api {

 constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //получ информации о пользователе с сервера
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //Метод получения карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //редактирование аватара
  editAvatar() {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrlinp.value,
      })
    }).then(this._checkResponse)
  };

  //редактированиt профиля
  editUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value,
      }),
    }).then(this._checkResponse);
  }

  apiAddNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: cardNameInput.value,
            link: cardSrcInput.value
        })
    }) .then(this._checkResponse); 
  }

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
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status},${res.statusTex}`);
  }
}
