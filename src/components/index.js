import "../pages/index.css";
import {
  initialCards,
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
  avatarUrlinp,
} from "./utils.js";
import {
  openPopup,
  closePopup,
  escClosePopup,
  closePopupOverlay,
} from "./modal.js";
import { createCard,renderCard } from "./card.js";
import { enableValidation } from "./validate.js";
import { getInitialCards, getUser, editUser ,editAvatar,apiAddNewCard} from "./api.js";



//закрытие всех попапов на крест
popupClosebtns.forEach((e) =>
  e.addEventListener("click", (e) => closePopup(e.target.closest(".popup")))
);


//открывает попап профиля
profileEditBtn.addEventListener("click", function () {
  //обработчик открытия профиля
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});
//добавляет поля профиля на страницу и сервер
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  editUser(profileName.textContent, profileStatus.textContent);
  closePopup(popupProfile);
}
//листнер профиля
// formElement.addEventListener("submit", handleProfileFormSubmit);


//открывает попап аватара
profileAvatarBtn.addEventListener("click", function () {
  console.log("avatar");
  openPopup(popupAvatar);
});
//добавляет аватар на страницу и сервер
function handleUpdateAvatar(evt) {
  evt.preventDefault();

  profileAvatar.src = avatarUrlinp.value;
  //console.log('aaaq');
  editAvatar(profileAvatar.src);
  closePopup(popupAvatar);
}
//листнер аватара
// popupAvatar.addEventListener("submit", handleUpdateAvatar);  


// cardSubmitBtn.removeEventListener("click",function (e) {
//   e.preventDefault();
//   const card = createCard(cardNameInput.value, cardSrcInput.value);
//   renderCard(card, cardsContainer);
//   //console.log(cardNameInput.value +'     '+cardSrcInput.value)
//   apiAddNewCard (cardNameInput.value ,cardSrcInput.value);
//   closePopup(popupCard);
// })  

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = createCard(cardNameInput.value, cardSrcInput.value);
  renderCard(card, cardsContainer);
  //console.log(cardNameInput.value +'     '+cardSrcInput.value)
  apiAddNewCard (cardNameInput.value ,cardSrcInput.value);
  closePopup(popupCard);
}

// //открывает попап карточки
addNewCardBtn.addEventListener("click", () => {
  cardNameInput.value = "";
  cardSrcInput.value = "";
  openPopup(popupCard);
});

export{
  handleUpdateAvatar,handleProfileFormSubmit,handleCardFormSubmit
}
// Вызовем функцию
enableValidation(enableValidationParams);
getUser();
getInitialCards();
