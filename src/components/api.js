

import {
    cardSubmitBtn,
    profileName,
    profileStatus,
    profileAvatar,
    profileBtnSubmit,
    avatarSubmBtn,
  } from "./variables.js";
  import { initialCards } from "./card.js";
  import { renderLoading } from "./modal";
  
  const apiConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-11",
    headers: {
      authorization: "5e97ff51-83fb-4a87-a9ba-ca3be6f4f066",
      "Content-Type": "application/json",
    },
  };

  function getUser() {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
      headers: apiConfig.headers,
    })
      .then(_checkResponse)
      
  };
  
  function getInitialCards() {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      headers: apiConfig.headers,
    })
      .then(_checkResponse)
    
  };
  //редактирование аватара
  function editAvatar(avatar) {
    return fetch (`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify ({
          avatar: avatar
        })
      })
      .then (_checkResponse)
    
  };
  
  //редактированиt профиля
  function editUser(nameInput, profileStatus) {
    return fetch (`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify ({
          name: nameInput,
          about: profileStatus
        })
      })
      .then (_checkResponse)
      
  };
  
  function apiAddNewCard(title, src) {
    return fetch (`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify ({
          name: title,
          link: src
        })
      })
      .then (_checkResponse)
    
  };
  function likeCard(cardId) {
      return fetch (`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: apiConfig.headers,
        })
        .then (_checkResponse)
        
    };
  
    function dislikeCard(cardId, cardlikes) {
      return fetch (`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: apiConfig.headers,
        })
        .then (_checkResponse)
        
    };
    function deleteCard(cardId) {
      return fetch (`${apiConfig.baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: apiConfig.headers,
        })
        .then (_checkResponse)
      };


      function _checkResponse(res) {
        if (res.ok) {
            return res.json();
          }
            return Promise.reject(`Ошибка: ${res.status}`);
    }
  
  export {
    getUser,
    getInitialCards,
    editUser,
    editAvatar,
    apiAddNewCard,
     likeCard,
    dislikeCard,
   deleteCard,
  };
  