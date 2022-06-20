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
  userId,avatarSubmBtn,
} from './utils.js';

import{
  openPopup,closePopup,renderLoading
} from './modal.js';
import{
  createCard,renderCard,initialCards
} from './card.js';
import{enableValidation,firstValidateForm,setEventListeners} from './validate.js';
import {
  getUser,
  getInitialCards,
  editUser,
  editAvatar,
  apiAddNewCard,
} from "./api.js";

//popupClosebtns.forEach(e => e.addEventListener('click', e =>closePopup(e.target.closest(".popup"))));

//открывает попап аватара
profileAvatarBtn.addEventListener("click", function () {
  avatarUrlinp.value=profileAvatar.src;
  console.log("avatar");
  openPopup(popupAvatar);
});

//добавляет аватар на страницу и сервер
function handleUpdateAvatar(evt) {
  evt.preventDefault();

 //profileAvatar.src = avatarUrlinp.value;
  //console.log('aaaq');
  editAvatar(profileAvatar.src)
  .then(() => {
    profileAvatar.src = avatarUrlinp.value
    closePopup(popupAvatar); 
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, avatarSubmBtn, 'Сохранить');
  })
};  
// //листнер аватара
popupAvatar.addEventListener("submit", handleUpdateAvatar);


//открывает попап профиля
profileEditBtn.addEventListener("click", function () {
  //обработчик открытия профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  openPopup(popupProfile);
});
//добавляет поля профиля на страницу и сервер
function handleProfileFormSubmit(evt) {
  renderLoading(true, profileBtnSubmit, 'Сохранить...');
  evt.preventDefault();editUser(nameInput.value, jobInput.value)
  .then(() => { profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;

  closePopup(popupProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, profileBtnSubmit, 'Сохранить');
})
};
//листнер профиля
profileBtnSubmit.addEventListener("click", handleProfileFormSubmit);



//открывает попап карты
addNewCardBtn.addEventListener("click", () =>{
  cardNameInput.value= '';
  cardSrcInput.value = '';
  firstValidateForm(cardSubmitBtn ,true);
  openPopup(popupCard)
});

function handleCardFormSubmit(evt) {
  renderLoading(true, cardSubmitBtn, 'Сохранение...');  
  evt.preventDefault();
  //console.log(cardNameInput.value +'     '+cardSrcInput.value)
  apiAddNewCard(cardNameInput.value, cardSrcInput.value)
  .then ((card) => {
    //console.log(card + " card")
    //const card = createCard(cardNameInput.value, cardSrcInput.value);
    renderCard(createCard(cardNameInput.value, cardSrcInput.value,card._id,card.likes, card.owner._id,), cardsContainer);
    formElementCard.reset();
    closePopup(popupCard);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false,cardSubmitBtn, 'Создать');
  })  
  
}

//листнер карты
cardSubmitBtn.addEventListener("click",handleCardFormSubmit);


enableValidation(enableValidationParams);

Promise.all([getUser(), getInitialCards()])
    .then(([user, card]) => {
  userId = user._id;
  profileName.textContent = user.name;
  profileStatus.textContent = user.about;
  profileAvatar.src = user.avatar;
  initialCards(card);

})
.catch((err) => {
  console.log(err);
})

//getUser();
//getInitialCards();
