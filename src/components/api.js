import {
  cardSubmitBtn,
  profileName,
  profileStatus,
  profileAvatar,
  profileBtnSubmit,
  avatarSubmBtn,
} from "./variables.js";
import { initialCards } from "./Card.js";
import { renderLoading } from "./modal";

// const apiConfig = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-11",
//   headers: {
//     authorization: "5e97ff51-83fb-4a87-a9ba-ca3be6f4f066",
//     "Content-Type": "application/json",
//   },
// };

// function getUser() {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     headers: apiConfig.headers,
//   }).then(_checkResponse);
// }

// function getInitialCards() {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     headers: apiConfig.headers,
//   }).then(_checkResponse);
// }
// //редактирование аватара
// function editAvatar(avatar) {
//   return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       avatar: avatar,
//     }),
//   }).then(_checkResponse);
// }

// //редактированиt профиля
// function editUser(nameInput, profileStatus) {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: nameInput,
//       about: profileStatus,
//     }),
//   }).then(_checkResponse);
// }

// function apiAddNewCard(title, src) {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     method: "POST",
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: title,
//       link: src,
//     }),
//   }).then(_checkResponse);
// }
// function likeCard(cardId) {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: apiConfig.headers,
//   }).then(_checkResponse);
// }

// function dislikeCard(cardId, cardlikes) {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: apiConfig.headers,
//   }).then(_checkResponse);
// }
// function deleteCard(cardId) {
//   return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
//     method: "DELETE",
//     headers: apiConfig.headers,
//   }).then(_checkResponse);
// }

// function _checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Ошибка: ${res.status}`);
// }



export default class Api {

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
  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  //редактированиt профиля
  editUser(nameInput, profileStatus) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        about: profileStatus,
      }),
    }).then(this._checkResponse);
  }

  // apiAddNewCard(data) {
  //   return fetch(`${apiConfig.baseUrl}/cards`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify(data),
  //   }).then(
  //     this._checkResponse,
  //     console.log("post")
  //     );
  // }
  apiAddNewCard(title, src) {
    return fetch (`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify ({
          name: title,
          link: src
        })
      })
      .then (this._checkResponse)
      console.log(title,src);
    
  };

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
      console.log(res.json());
    }
    return Promise.reject(`Ошибка: ${res.status},${res.statusTex}`);
  }
}
