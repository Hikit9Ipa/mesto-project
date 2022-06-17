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
  popupAvatar,
  ElementElement,
} from "./utils.js";
import {
  openPopup,
  closePopup,
  escClosePopup,
  closePopupOverlay,
} from "./modal.js";
import{dislikeCard,likeCard,deleteCard} from './api.js';


///Функция, которая собирает данные карточки
function initialCards(data) {
  data.forEach(function (elem) {
    const card = createCard(
      elem.name,
      elem.link,
      elem._id,
      elem.likes.length,
      elem.owner._id
    );
    console.log(card);
    renderCard(card, cardsContainer);
  });
}
//Функция, которая вставлять карточки в указанный нами контейнер
function renderCard(card, container) {
  container.prepend(card);
}
// function createCard(cardName, cardSrc) {
//   const cardElement = cardTemplate
//     .querySelector(".elements__element")
//     .cloneNode(true);
//   cardElement.querySelector(".elements__title").textContent = cardName;
//   cardElement.querySelector(".elements__image").src = cardSrc;
//   cardElement.querySelector(".elements__image").alt = cardName;
//   const cardDeleteBtn = cardElement.querySelector(".elements__delete-btn");
//   cardDeleteBtn.addEventListener("click", function (e) {
//     e.target.closest(".elements__element").remove(cardElement);
//     console.log("dell click");
//   });
//   const likeBtn = cardElement.querySelector(".elements__heart-btn");
//   likeBtn.addEventListener("click", function (e) {
//     e.target.classList.toggle("element__heart-btn_active");
//     console.log("like click");
//   });

//   const imgFullSize = cardElement.querySelector(".elements__image");
//   imgFullSize.addEventListener("click", (e) => {
//     openPopup(imgOpen);
//     imgBigSize.src = cardSrc;
//     imgCaption.textContent = cardName;
//     imgBigSize.alt = cardName;
//   });
//   return cardElement;
// }
function createCard(cardName, cardSrc, cardId, cardlikes, cardownerId) {
    const cardElement = ElementElement.cloneNode(true);
    const cardElementTitle = cardElement.querySelector(".elements__title");
    const cardElementImg = cardElement.querySelector(".elements__image");
    const cardDeleteBtn = cardElement.querySelector(".elements__delete-btn");
    const likeBtn = cardElement.querySelector(".elements__heart-btn");
    const likeBtnCount = cardElement.querySelector(".elements__heart-btn-count");
    console.log(cardownerId);
    cardElementImg.src = cardSrc;
    cardElementImg.id = cardId;
    cardElementImg.alt = cardName;
    cardElementTitle.textContent = cardName;
    likeBtnCount.textContent = cardlikes;
    likeBtn.addEventListener('click',e=>{
      if (!e.target.classList.contains('elements__heart-btn_active')) {
        e.target.classList.add('elements__heart-btn_active');
        likeCard(cardId, likeBtnCount);
      } else {
        e.target.classList.remove('elements__heart-btn_active');
        dislikeCard(cardId,likeBtnCount);
      } 
    })
    const myOwnerCard = cardownerId;
  if (myOwnerCard === '8fb1ea325510c052bd2c5531') {
   // const cardDeleteBtn = cardElement.querySelector("#qqqwe");
    cardDeleteBtn.style.display = 'block';
    cardDeleteBtn.addEventListener('click', function (evt) {
    evt.target.closest('.elements__element').remove(cardElement);
    deleteCard(cardId);
  });
};
    cardElementImg.addEventListener("click", (e) => {
      openPopup(imgOpen);
      imgBigSize.src = cardSrc;
      imgCaption.textContent = cardName;
      imgBigSize.alt = cardName;
    });
    return cardElement;
  }


    export { initialCards , createCard,renderCard };
