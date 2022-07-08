// const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];
const popupClosebtns = document.querySelectorAll(".popup__close");
const profileEditBtn = document.querySelector("#prifile-edit-btn");
const profileAvatarBtn = document.querySelector(
  "#profile__avatar-update-button"
); //кнопка редактирования профиля
const addNewCardBtn = document.querySelector(".profile__add-btn"); //кнопка добавления карточки
const cardPopupCloseBtn = document.querySelector("#cardPopupCloseBtn"); //кнопка закрытия формы редактирования
const cardSubmitBtn = document.querySelector("#cardSubmitBtn"); //кнопка сохранения карты
const formElement = document.querySelector(".popup__form"); //форма редактирования профиля
const nameInput = formElement.querySelector("#popup__input-name"); //поле редактирование имени пользовате
const jobInput = formElement.querySelector("#popup__input-status"); //поле редактирование  job пользователя
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileAvatar = document.querySelector(".profile__avatar");
const profileBtnSubmit = document.querySelector("#profile-btn-submit"); //// сохранение профиля
const popupAvatar = document.querySelector("#popup-update-avatar");
const avatarUrlinp = document.querySelector("#url-avatar-input");
const avatarSubmBtn = document.querySelector("#update-avatar"); //// сохранение аватарки
const formElementCard = document.querySelector("#popupformCard"); //форма редактирования карточки
const cardsContainer = ".elements"; //контейнер для карточек
const cardTemplate = "#cardTemplate"; //получаем содержимое template
const ElementElement = document.querySelector(".elements__element");
const cardNameInput = document.querySelector("#popup__input-cardname"); //поле редактирование имени пользовате
const cardSrcInput = document.querySelector("#popup__input-cardsrc"); //поле редактирование  job пользователя
const imgOpen = document.querySelector("#popup-img"); //переменные для работы с фотографией
const imgBigSize = document.querySelector(".img-popup__img");
const imgCaption = document.querySelector(".img-popup__caption");
const popupProfile = document.querySelector("#popup-profile");
const popupCard = document.querySelector("#popup-card");
const formInput = formElement.querySelector(".popup__input");
const popups = document.querySelectorAll(".popup");
const enableValidationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};
const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-11",
  headers: {
    authorization: "5e97ff51-83fb-4a87-a9ba-ca3be6f4f066",
    "Content-Type": "application/json"
  }
};

export {
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
  popupAvatar,
  ElementElement,
  avatarUrlinp,
  avatarSubmBtn,
  //initialCards
  apiConfig
};
