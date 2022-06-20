import {
    cardSubmitBtn,
    profileName,
    profileStatus,
    profileAvatar,
    profileBtnSubmit,
    avatarSubmBtn,
  } from "./utils.js";
  import { initialCards } from "./card.js";
  import { renderLoading } from "./modal";
  
  const apiConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-11",
    headers: {
      authorization: "5e97ff51-83fb-4a87-a9ba-ca3be6f4f066",
      "Content-Type": "application/json",
    },
  };
// ver 9.0   function getUser() {
//     return fetch(`${apiConfig.baseUrl}/users/me`, {
//       headers: apiConfig.headers,
//     })
//       .then(_checkResponse)
//       .then((result) => {
//         profileName.textContent = result.name;
//         profileStatus.textContent = result.about;
//         profileAvatar.src = result.avatar;
//        console.log(result.name + " " + result.about + " " + result.avatar);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
  
//   function getInitialCards() {
//     return fetch(`${apiConfig.baseUrl}/cards`, {
//       headers: apiConfig.headers,
//     })
//       .then(_checkResponse)
//       .then((result) => {
//         initialCards(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
  function getUser() {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
      headers: apiConfig.headers,
    })
      .then(_checkResponse)
    //   .then((result) => {
    //     profileName.textContent = result.name;
    //     profileStatus.textContent = result.about;
    //     profileAvatar.src = result.avatar;
    //    // console.log(result.name + " " + result.about + " " + result.avatar);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  
  function getInitialCards() {
    return fetch(`${apiConfig.baseUrl}/cards`, {
      headers: apiConfig.headers,
    })
      .then(_checkResponse)
    //   .then((result) => {
    //     initialCards(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
    //   .then((res) => {
    //    // renderLoading(false, avatarSubmBtn, 'Сохранить');
    //    // console.log(res);
  
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
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
    //   .then((res) => {
    //     //console.log('3');
    //    // renderLoading(false, profileBtnSubmit, 'Сохранить');
    //    // console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
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
    //   .then((res) => {
    //    // renderLoading(false, cardSubmitBtn, 'Создать');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  };
  function likeCard(cardId) {
      return fetch (`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: apiConfig.headers,
        })
        .then (_checkResponse)
        // .then ((res) => {
        //   cardlikes.textContent = res.likes.length;
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    };
  
    function dislikeCard(cardId, cardlikes) {
      return fetch (`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: apiConfig.headers,
        })
        .then (_checkResponse)
        // .then ((res) => {
        //   cardlikes.textContent = res.likes.length;
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
    };
    function deleteCard(cardId) {
      return fetch (`${apiConfig.baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: apiConfig.headers,
        })
        .then (_checkResponse)
        // .catch((err) => {
        //   console.log(err);
        // });
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
  