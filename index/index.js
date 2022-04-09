const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const profileEditBtn = document.querySelector(".profile__edit-btn"); //кнопка редактирования профиля
const profilePopupCloseBtn = document.querySelector(".popup__close"); //кнопка закрытия формы редактирования
const profileSubmitBtn = document.querySelector(".popup__submit"); //кнопка сохранения на форме редактирования профиля
const addNewCardBtn = document.querySelector(".profile__add-btn"); //кнопка добавления карточки
const cardPopupCloseBtn = document.querySelector("#cardPopupCloseBtn"); //кнопка закрытия формы редактирования
const cardSubmitBtn = document.querySelector("#cardSubmitBtn"); //кнопка сохранения на форме редактирования профиля
const popup = document.querySelectorAll(".popup");

const formElement = document.querySelector(".popup__form"); //форма редактирования профиля
const nameInput = formElement.querySelector("#popup__input-name"); //поле редактирование имени пользовате
const jobInput = formElement.querySelector("#popup__input-status"); //поле редактирование  job пользователя
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");

const formElementCard = document.querySelector("#popupformCard"); //форма редактирования карточки
const cardsContainer = document.querySelector(".elements"); //контейнер для карточек
const cardTemplate = document.querySelector("#cardTemplate").content; //получаем содержимое template
const cardNameInput = formElement.querySelector("#popup__input-cardname"); //поле редактирование имени пользовате
const cardSrcInput = formElement.querySelector("#popup__inputcardsrc"); //поле редактирование  job пользователя
const imgOpen = document.querySelector("#popup-img"); //переменные для работы с фотографией
const imgBigSize = document.querySelector(".img-popup__img");
const imgCaption = document.querySelector(".img-popup__caption");
//document.querySelector("#full-img__btn-close").addEventListener('click', e => e.target.closest('#popup-img').classList.remove("popap_opened"));
profileEditBtn.addEventListener("click", function () {
  //обработчик открытия профиля
  document.querySelector("#popup-profile").classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});
profilePopupCloseBtn.addEventListener("click", function () {
  //обработчик закрытия профиля
  document.querySelector("#popup-profile").classList.remove("popup_opened");
});
function formSubmitHandler(evt) {
  // устанавливает имя и job пользователя и закрывает popup
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  document.querySelector("#popup-profile").classList.remove("popup_opened");
}
formElement.addEventListener("submit", formSubmitHandler); // Прикрепляем обработчик к форме

addNewCardBtn.addEventListener("click", () =>
  document.querySelector("#popup-card").classList.add("popup_opened")
);
cardPopupCloseBtn.addEventListener("click", () =>{
  document.querySelector("#popup-card").classList.remove("popup_opened")
  console.log('close');
}
);

initialCards.forEach(function (element) {
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardDeleteBtn = cardElement.querySelector(".elements__delete-btn");
  cardDeleteBtn.addEventListener("click", function (e) {
    e.target.closest(".elements__element").remove(cardElement);
  });
  const likeBtn = cardElement.querySelector(".elements__heart-btn");
  likeBtn.addEventListener("click", function (e) {
    e.target.classList.toggle("element__heart-btn_active");
    console.log("like click");
  });
  cardElement.querySelector(".elements__title").textContent = element.name;
  cardElement.querySelector(".elements__image").src = element.link;

  const imgFullSize = cardElement.querySelector(".elements__image");
  imgFullSize.addEventListener('click',e =>{
    imgOpen.classList.add("popup_opened");
    imgBigSize.src = imgFullSize.src;
    imgCaption.textContent = cardElement.querySelector(".elements__title").textContent;
  });
  document.querySelector("#full-img__btn-close").addEventListener('click', e => {e.target.closest('#popup-img').classList.remove("popap_opened")});
  cardsContainer.append(cardElement);
});

function addCard(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  cardElement.querySelector(".elements__title").textContent =
    formElementCard.querySelector("#popup__input-cardname").value;
  cardElement.querySelector(".elements__image").src =
    formElementCard.querySelector("#popup__inputcardsrc").value;
  const cardDeleteBtn = cardElement.querySelector(".elements__delete-btn");
  cardDeleteBtn.addEventListener("click", function (e) {
    e.target.closest(".elements__element").remove(cardElement);
  });
  const likeBtn = cardElement.querySelector(".elements__heart-btn");
  likeBtn.addEventListener("click", function (e) {
    e.target.classList.toggle("element__heart-btn_active");
  });
  const imgFullSize = cardElement.querySelector(".elements__image");
  imgFullSize.addEventListener('click',e =>{
    imgOpen.classList.add("popup_opened");
    imgBigSize.src = imgFullSize.src;
    imgCaption.textContent = cardElement.querySelector(".elements__title").textContent;
  });
  document.querySelector("#full-img__btn-close").addEventListener('click', e => {e.target.closest('#popup-img').classList.remove("popap_opened")});
  
  cardsContainer.prepend(cardElement);
  document.querySelector("#popup-card").classList.remove("popup_opened");
}
formElementCard.addEventListener("submit", addCard);