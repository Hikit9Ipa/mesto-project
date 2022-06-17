import {
  popupClosebtns,
  profileEditBtn,
  addNewCardBtn,
  cardPopupCloseBtn,
  cardSubmitBtn,
  formElement,
  nameInput,
  jobInput,
  profileName,
  profileStatus,
  formElementCard,
  cardsContainer,
  cardTemplate,
  cardNameInput,
  cardSrcInput,
  imgOpen,
  imgBigSize,
  imgCaption,
  popupProfile,
  popupCard,
  formInput,
  popups,
  enableValidationParams,
  profileAvatar,
  profileBtnSubmit,
  profileAvatarBtn,
  popupAvatar ,
  ElementElement,
  avatarUrlinp,
  avatarSubmBtn,
} from "./utils.js";
import { initialCards } from "./card.js";
import{renderLoading} from './modal'
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      profileName.textContent = result.name;
      profileStatus.textContent = result.about;
      profileAvatar.src = result.avatar;
      //console.log(result.name + " " + result.about + " " + result.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      initialCards(result);
    })
    .catch((err) => {
      console.log(err);
    });
}
//редактирование аватара
function editAvatar(avatar) {
  return fetch (`${apiConfig.baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: apiConfig.headers,
      body: JSON.stringify ({
        avatar: avatar
      })
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      renderLoading(false, avatarSubmBtn, 'Сохранить'); 
      console.log(res);
      
    })
    .catch((err) => {
      console.log(err);
    })
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
    .then (res => {
      if (res.ok) {
        //console.log('1');
        return res.json();
      }
      console.log('2');
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      //console.log('3');
      renderLoading(false, profileBtnSubmit, 'Сохранить');
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
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
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      renderLoading(false, cardSubmitBtn, 'Создать');
    })
    .catch((err) => {
      console.log(err);
    })
};
function likeCard(cardId, cardlikes) {
    return fetch (`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT', 
        headers: apiConfig.headers,
      })
      .then (res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then ((res) => {
        cardlikes.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  function dislikeCard(cardId, cardlikes) {
    return fetch (`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE', 
        headers: apiConfig.headers,
      })
      .then (res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then ((res) => {
        cardlikes.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function deleteCard(cardId) {
    return fetch (`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE', 
        headers: apiConfig.headers,
      })
      .then (res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
    };











































//   //Функция получения информации о пользователе с сервера
// function getUser() {
//   return fetch (
//     `${apiConfig.baseUrl}/users/me`, {
//       headers: apiConfig.headers
//     })
//     .then (res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//     .then((result) => {
//       nameUser.textContent = result.name;
//       jobUser.textContent = result.about;
//       urlAvatarUser.src = result.avatar;
//       })
//     .catch((err) => {
//       console.log(err);
//     });
// };

//   //Функция редактирования профиля
//   function editUser(nameUser, jobUser) {
//     return fetch (`${apiConfig.baseUrl}/users/me`, {
//         method: 'PATCH',
//         headers: apiConfig.headers,
//         body: JSON.stringify ({
//           name: nameUser,
//           about: jobUser
//         })
//       })
//       .then (res => {
//         if (res.ok) {
//           return res.json();
//         }
//           return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .then(() => {
//         renderLoading(false, btnEditProfileSubmit, 'Сохранить');
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   };

//   //Функция редактирования аватара
//   function editAvatar(avatar) {
//     return fetch (`${apiConfig.baseUrl}/users/me/avatar`, {
//         method: 'PATCH',
//         headers: apiConfig.headers,
//         body: JSON.stringify ({
//           avatar: avatar
//         })
//       })
//       .then (res => {
//         if (res.ok) {
//           return res.json();
//         }
//           return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .then(() => {
//         renderLoading(false, btnUpdateAvatarSubmit, 'Сохранить');
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   };

//   //Функция добавления новой карточки
//   function apiAddNewCard(name, link) {
//     return fetch (`${apiConfig.baseUrl}/cards`, {
//         method: 'POST',
//         headers: apiConfig.headers,
//         body: JSON.stringify ({
//           name: name,
//           link: link
//         })
//       })
//       .then (res => {
//         if (res.ok) {
//           return res.json();
//         }
//           return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .then(() => {
//         renderLoading(false, btnImgNewSubmit, 'Создать');
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   };

//   //Функция лайков у карточки:
//   function likeCard(idCard, likeCount) {
//     return fetch (`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
//         method: 'PUT',
//         headers: apiConfig.headers,
//       })
//       .then (res => {
//         if (res.ok) {
//           return res.json();
//         }
//           return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .then ((res) => {
//         likeCount.textContent = res.likes.length;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   function dislikeCard(idCard, likeCount) {
//     return fetch (`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
//         method: 'DELETE',
//         headers: apiConfig.headers,
//       })
//       .then (res => {
//         if (res.ok) {
//           return res.json();
//         }
//           return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .then ((res) => {
//         likeCount.textContent = res.likes.length;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   function deleteCard(idCard) {
//     return fetch (`${apiConfig.baseUrl}/cards/${idCard}`, {
//         method: 'DELETE',
//         headers: apiConfig.headers,
//       })
//       .then (res => {
//         if (res.ok) {
//           return res.json();
//         }
//           return Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     };

export {
  getInitialCards,
  getUser,
  editUser,
  editAvatar,
  apiAddNewCard,
  likeCard,
  dislikeCard,
  deleteCard
};
