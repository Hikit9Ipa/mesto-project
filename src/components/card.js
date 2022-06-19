
import{
  
  cardsContainer,
  imgOpen,
  imgBigSize,
  imgCaption,
  ElementElement,
  //initialCards
} from './utils.js';
import{
  openPopup
} from './modal.js';
import {
 likeCard,
  dislikeCard,
 deleteCard,
} from "./api.js";
//Функция, которая вставлять карточки в указанный нами контейнер
function renderCard(card, container) {
  container.prepend(card);
}

function createCard(cardName, cardSrc, cardId, cardlikes, cardownerId) { //ver.9
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
  likeBtn.addEventListener("click", (e) => {
    if (!e.target.classList.contains("elements__heart-btn_active")) {
      e.target.classList.add("elements__heart-btn_active");
      likeCard(cardId, likeBtnCount);
    } else {
      e.target.classList.remove("elements__heart-btn_active");
      dislikeCard(cardId, likeBtnCount);
    }
  });
  const myOwnerCard = cardownerId;
  if (myOwnerCard === "8fb1ea325510c052bd2c5531") {
    const cardDeleteBtn = cardElement.querySelector("#qqqwe");
    cardDeleteBtn.style.display = "block";
    cardDeleteBtn.addEventListener("click", function (evt) {
      evt.target.closest(".elements__element").remove(cardElement);
      deleteCard(cardId);
    });
  }
  cardElementImg.addEventListener("click", (e) => {
    openPopup(imgOpen);
    imgBigSize.src = cardSrc;
    imgCaption.textContent = cardName;
    imgBigSize.alt = cardName;
  });
  return cardElement;
}

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
export{createCard,initialCards,renderCard}
