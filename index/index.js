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
const popupClosebtns = [...document.querySelectorAll(".popup__close")];
const profileEditBtn = document.querySelector(".profile__edit-btn"); //кнопка редактирования профиля
const addNewCardBtn = document.querySelector(".profile__add-btn"); //кнопка добавления карточки
const cardPopupCloseBtn = document.querySelector("#cardPopupCloseBtn"); //кнопка закрытия формы редактирования
const cardSubmitBtn = document.querySelector("#cardSubmitBtn"); //кнопка сохранения на форме редактирования профиля

const formElement = document.querySelector(".popup__form"); //форма редактирования профиля
const nameInput = formElement.querySelector("#popup__input-name"); //поле редактирование имени пользовате
const jobInput = formElement.querySelector("#popup__input-status"); //поле редактирование  job пользователя
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const formElementCard = document.querySelector("#popupformCard"); //форма редактирования карточки

const cardsContainer = document.querySelector(".elements"); //контейнер для карточек
const cardTemplate = document.querySelector("#cardTemplate").content; //получаем содержимое template
const cardNameInput = document.querySelector("#popup__input-cardname"); //поле редактирование имени пользовате
const cardSrcInput = document.querySelector("#popup__input-cardsrc"); //поле редактирование  job пользователя
const imgOpen = document.querySelector("#popup-img"); //переменные для работы с фотографией
const imgBigSize = document.querySelector(".img-popup__img");
const imgCaption = document.querySelector(".img-popup__caption");
const popupProfile = document.querySelector("#popup-profile");
const popupCard = document.querySelector("#popup-card");
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Функция закрытия всех popup-окон
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function createCard(cardName, cardSrc) {
  const cardElement = cardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  cardElement.querySelector(".elements__title").textContent = cardName;
  cardElement.querySelector(".elements__image").src = cardSrc;
  cardElement.querySelector(".elements__image").alt = cardName;
  const cardDeleteBtn = cardElement.querySelector(".elements__delete-btn");
  cardDeleteBtn.addEventListener("click", function (e) {
    e.target.closest(".elements__element").remove(cardElement);
    console.log("dell click");
  });
  const likeBtn = cardElement.querySelector(".elements__heart-btn");
  likeBtn.addEventListener("click", function (e) {
    e.target.classList.toggle("element__heart-btn_active");
    console.log("like click");
  });

  const imgFullSize = cardElement.querySelector(".elements__image");
  imgFullSize.addEventListener("click", (e) => {
    openPopup(imgOpen);
    imgBigSize.src = cardSrc;
    imgCaption.textContent = cardName;
    imgBigSize.alt = cardName;
  });
  return cardElement;
}
initialCards.forEach(function (element) {
  cardsContainer.append(createCard(element.name, element.link));
});
popupClosebtns.forEach(e => e.addEventListener('click', e =>closePopup(e.target.closest(".popup"))));

profileEditBtn.addEventListener("click", function () {
  //обработчик открытия профиля
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});

function handleProfileFormSubmit(evt) {
  // устанавливает имя и job пользователя и закрывает popup
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(popupProfile);
  }
formElement.addEventListener("submit", handleProfileFormSubmit); // Прикрепляем обработчик к форме

addNewCardBtn.addEventListener("click", () =>{
  cardNameInput.value= '';
  cardSrcInput.value = '';
  openPopup(popupCard)
});
function addCard(evt) {
evt.preventDefault();
cardsContainer.prepend(createCard(cardNameInput.value,cardSrcInput.value));
closePopup(popupCard);

}
formElementCard.addEventListener("submit", addCard);
