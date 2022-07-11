import "../pages/index.css";
import {
  profileEditBtn,
  addNewCardBtn,
  cardSubmitBtn,
  nameInput,
  jobInput,
  profileName,
  profileStatus,
  formElementCard,
  cardsContainer,
  cardTemplate,
  cardNameInput,
  cardSrcInput,
  popupProfile,
  popupCard,
  enableValidationParams,
  profileAvatar,
  profileBtnSubmit,
  profileAvatarBtn,
  popupAvatar,
  avatarUrlinp,
  avatarSubmBtn,
  apiConfig,
  imgOpen,
} from "./variables.js";

import { openPopup, closePopup, renderLoading } from "./modal.js";
import { createCard, renderCard, initialCards } from "./Card.js";
import {
  enableValidation,
  firstValidateForm,
  setEventListeners,
} from "./validate.js";
import {Api} from "./Api.js";
import UserInfo from "./UserInfo.js";
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {PopupWithForm} from "./PopupWithForm.js";

const api = new Api(apiConfig);

const newUser = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__status",
  userAvatar: ".profile__avatar",
});

let userId = null;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;

   newUser.setUserInfo(user);
   newUser.setUserAvatar(user);

  cards.reverse();
  cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));
  
// Добавление готовых карточек на страницу
const cardList = new Section(
  {
    items: [],
    renderer: (items) => {
      const card = createNewCard(items);
      cardList.addItem(card);
    },
  },
  cardsContainer
);

const createNewCard = (data) => {
  const card = new Card(
    {
      data,
      userId,
      handleCardClick: () => {
        console.log("big image");
      },

      handleDeleteCard: () => {
        api
          .deleteCard(card._id)
          .then(() => {
            card.deleteCard();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleLikeCard: () => {
        if (card.isLiked()) {
          api
            .dislikeCard(card._id)
            .then((data) => {
              card.deleteLike();
              card.setLikeCount(data.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .likeCard(card._id)
            .then((data) => {
              card.addLike();
              card.setLikeCount(data.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    cardTemplate
  );
  return card.createCard();
};

//валидация

const profileValidator = new FormValidator(
  enableValidationParams,
  popupProfile
);
profileValidator.enableValidation();

const addNewCardValidator = new FormValidator(
  enableValidationParams,
  popupCard
);
addNewCardValidator.enableValidation();

const avatarValidator = new FormValidator(enableValidationParams, popupAvatar);
avatarValidator.enableValidation();

const updateAvatarPopup = new PopupWithForm(popupAvatar, {
  handleFormSubmit: (data) => {
    updateAvatarPopup.renderLoadingStatus(true)
    api.editAvatar(data)
      .then((data) => {
        newUser.setUserAvatar(data);
        updateAvatarPopup.close()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        updateAvatarPopup.renderLoading(false);
    })   
  }
})

updateAvatarPopup.setEventListeners();

//открывает попап аватара
profileAvatarBtn.addEventListener("click", function () {
  updateAvatarPopup.open();

  avatarValidator.toggleButtonState();
  avatarValidator.resetValidation();
});


const updateProfilePopup = new PopupWithForm(popupProfile, {
  handleFormSubmit: (data) => {
    updateProfilePopup.renderLoadingStatus(true);
    api.editUser(data)
      .then((res) => {
        newUser.setUserInfo(res);
        updateProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateProfilePopup.renderLoadingStatus(false);
      })
  },
});

updateProfilePopup.setEventListeners();

//открывает попап профиля
profileEditBtn.addEventListener("click", function () {
  updateProfilePopup.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  
  profileValidator.toggleButtonState();
  profileValidator.resetValidation();
});

//Добавление новой карточки
const addNewCardPopup = new PopupWithForm(popupCard, {
  handleFormSubmit: (data) => {
    addNewCardPopup.renderLoadingStatus(true);
    api.apiAddNewCard(data)
        .then((data) => {
            const card = createNewCard(data);
            cardList.addItem(card);
            addNewCardPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
          addNewCardPopup.renderLoadingStatus(false);
        })
}
});

addNewCardPopup.setEventListeners();

addNewCardBtn.addEventListener("click", () => {
  addNewCardPopup.open();
  addNewCardValidator.toggleButtonState();
  addNewCardValidator.resetValidation();
});

//обработчик открытия профиля
//nameInput.value = profileName.textContent;
//jobInput.value = profileStatus.textContent;
//popupProfile.open();

// Promise.all([getUser(), getInitialCards()])
//     .then(([user, card]) => {
//   userId = user._id;
//   profileName.textContent = user.name;
//   profileStatus.textContent = user.about;
//   profileAvatar.src = user.avatar;
//   initialCards(card);

// })
// .catch((err) => {
//   console.log(err);
// })

// //открывает попап аватара
// profileAvatarBtn.addEventListener("click", function () {
//   avatarUrlinp.value=profileAvatar.src;
//   console.log("avatar");
//   openPopup(popupAvatar);
// });

// //добавляет аватар на страницу и сервер
// function handleUpdateAvatar(evt) {
//   evt.preventDefault();

//   editAvatar(profileAvatar.src)
//   .then(() => {
//     profileAvatar.src = avatarUrlinp.value
//     closePopup(popupAvatar);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     renderLoading(false, avatarSubmBtn, 'Сохранить');
//   })
// };
// // //листнер аватара
// popupAvatar.addEventListener("submit", handleUpdateAvatar);

// //открывает попап профиля
// profileEditBtn.addEventListener("click", function () {
//   //обработчик открытия профиля
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileStatus.textContent;
//   openPopup(popupProfile);
// });
// //добавляет поля профиля на страницу и сервер
// function handleProfileFormSubmit(evt) {
//   renderLoading(true, profileBtnSubmit, 'Сохранить...');
//   evt.preventDefault();
//   editUser(nameInput.value, jobInput.value)
//   .then(() => { profileName.textContent = nameInput.value;
//   profileStatus.textContent = jobInput.value;

//   closePopup(popupProfile);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     renderLoading(false, profileBtnSubmit, 'Сохранить');
// })
// };
// //листнер профиля
// profileBtnSubmit.addEventListener("click", handleProfileFormSubmit);

// //открывает попап карты
// addNewCardBtn.addEventListener("click", () =>{
//   cardNameInput.value= '';
//   cardSrcInput.value = '';
//   firstValidateForm(cardSubmitBtn ,true);
//   openPopup(popupCard)
// });

// function handleCardFormSubmit(evt) {
//   renderLoading(true, cardSubmitBtn, 'Сохранение...');
//   evt.preventDefault();
//   apiAddNewCard(cardNameInput.value, cardSrcInput.value)
//   .then ((card) => {
//     renderCard(createCard(cardNameInput.value, cardSrcInput.value,card._id,card.likes, card.owner._id,), cardsContainer);
//     formElementCard.reset();
//     closePopup(popupCard);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     renderLoading(false,cardSubmitBtn, 'Создать');
//   })

// }

// //листнер карты
// cardSubmitBtn.addEventListener("click",handleCardFormSubmit);

// enableValidation(enableValidationParams);

// Promise.all([getUser(), getInitialCards()])
//     .then(([user, card]) => {
//   userId = user._id;
//   profileName.textContent = user.name;
//   profileStatus.textContent = user.about;
//   profileAvatar.src = user.avatar;
//   initialCards(card);

// })
// .catch((err) => {
//   console.log(err);
// })
