import "../pages/index.css";
import {
  profileEditBtn,
  addNewCardBtn,
  nameInput,
  jobInput,
  cardsContainer,
  cardTemplate,
  popupProfile,
  popupCard,
  enableValidationParams,
  profileAvatarBtn,
  popupAvatar,
  apiConfig,
  imgOpen,
} from "../utils/Variables.js";

import {Api} from "./Api.js";
import {UserInfo} from "./UserInfo.js";
import {Section} from "./Section.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {PopupWithImage} from "./PopupWithImage.js";

const api = new Api(apiConfig);

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

//Управление информацией о пользователе
const newUser = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__status",
  userAvatar: ".profile__avatar",
});
  
//Добавление готовых карточек на страницу
const cardList = new Section({
  items: [],
  renderer: (items) => {
    const card = createNewCard(items);
    cardList.addItem(card);
  },
},cardsContainer);

//Создание новой карточки
const createNewCard = (data) => {
  const card = new Card({
    data, userId,
    handleCardClick: () => {
      popupOpenImage.open(data.name, data.link);
    },
    handleDeleteCard: () => {
      api.deleteCard(card._id)
      .then(() => {
        card.deleteCard();
      })
      .catch((err) => {
        console.log(err);
      });
    },
    handleLikeCard: () => {
      if (card.isLiked()) {
        api.dislikeCard(card._id)
          .then((data) => {
            card.deleteLike();
            card.setLikeCount(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.likeCard(card._id)
          .then((data) => {
            card.addLike();
            card.setLikeCount(data.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  }, cardTemplate);
  return card.createCard();
};

//Валидация
const profileValidator = new FormValidator(enableValidationParams, popupProfile);
profileValidator.enableValidation();

const addNewCardValidator = new FormValidator(enableValidationParams, popupCard);
addNewCardValidator.enableValidation();

const avatarValidator = new FormValidator(enableValidationParams, popupAvatar);
avatarValidator.enableValidation();

//Попап открытия большой картинки
const popupOpenImage = new PopupWithImage(imgOpen);
popupOpenImage.setEventListeners();

//Обновление и открытие попапа аватара
const updateAvatarPopup = new PopupWithForm(popupAvatar, {
  handleFormSubmit: (data) => {
    updateAvatarPopup.renderLoadingStatus(true);
    //console.log(data);
    api.editAvatar(data)
      .then((data) => {
        newUser.setUserAvatar(data);
        updateAvatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        updateAvatarPopup.renderLoadingStatus(false);
    })   
  }
})

updateAvatarPopup.setEventListeners();

profileAvatarBtn.addEventListener("click", function () {
  updateAvatarPopup.open();
  avatarValidator.toggleButtonState();
  avatarValidator.resetValidation();
});

//Редактирование профиля
const updateProfilePopup = new PopupWithForm(popupProfile, {
  handleFormSubmit: (data) => {
    updateProfilePopup.renderLoadingStatus(true);
    console.log(data);
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
  }
});

function editProfile() {
  const userData = newUser.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
}

updateProfilePopup.setEventListeners();

profileEditBtn.addEventListener("click", function () {
  editProfile()
  updateProfilePopup.open();

  profileValidator.toggleButtonState();
  profileValidator.resetValidation();
});

//Добавление новой карточки
const addNewCardPopup = new PopupWithForm(popupCard, {
  handleFormSubmit: (data) => {
    console.log(data)
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
