import "../pages/index.css";
import{
  popupClosebtns,
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
} from './utils.js';

import{
  openPopup,closePopup
} from './modal.js';
import{
  createCard,renderCard,
} from './card.js';
import{enableValidation,firstValidateForm,setEventListeners} from './validate.js';
import {
  getUser,
  getInitialCards,
  editUser,
  editAvatar,
  apiAddNewCard,
} from "./api.js";

popupClosebtns.forEach(e => e.addEventListener('click', e =>closePopup(e.target.closest(".popup"))));

//открывает попап аватара
profileAvatarBtn.addEventListener("click", function () {
  avatarUrlinp.value=profileAvatar.src;
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
// //листнер аватара
popupAvatar.addEventListener("submit", handleUpdateAvatar);





// profileEditBtn.addEventListener("click", function () {
//   //обработчик открытия профиля
//   //openPopup(popupProfile);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileStatus.textContent;
//   openPopup(popupProfile);
// });

// initialCards.forEach(function (element) {
//   cardsContainer.append(createCard(element.name, element.link));
// });






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
  console.log('1234')
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  editUser(profileName.textContent, profileStatus.textContent);
  closePopup(popupProfile);
}
//листнер профиля
profileBtnSubmit.addEventListener("click", handleProfileFormSubmit);



//открывает попап карты
addNewCardBtn.addEventListener("click", () =>{
  cardNameInput.value= '';
  cardSrcInput.value = '';
  firstValidateForm(cardSubmitBtn ,true);
  openPopup(popupCard)
});
//добавляет поля карты на страницу и сервер
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard(cardNameInput.value, cardSrcInput.value);
  renderCard(card, cardsContainer);
  console.log(cardNameInput.value +'     '+cardSrcInput.value)
  apiAddNewCard(cardNameInput.value, cardSrcInput.value);
  closePopup(popupCard);
}
//листнер карты
cardSubmitBtn.addEventListener("click",handleCardFormSubmit);


enableValidation(enableValidationParams);
getUser();
getInitialCards();
