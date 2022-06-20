import {
  cardsContainer,
  imgOpen,
  imgBigSize,
  imgCaption,
  ElementElement,
  //initialCards
} from "./utils.js";
import { openPopup } from "./modal.js";
import { likeCard, dislikeCard, deleteCard } from "./api.js";
import { userId } from "./utils.js";
//Функция, которая вставлять карточки в указанный нами контейнер
function renderCard(card, container) {
  container.prepend(card);
}

function createCard(cardName, cardSrc, cardId, cardlikes, cardownerId) {
  //ver.9
  console.log(cardName+" "+ cardSrc+" "+ cardId+" "+ cardlikes.length+" "+ cardownerId)
  const cardElement = ElementElement.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".elements__title");
  const cardElementImg = cardElement.querySelector(".elements__image");
  const cardDeleteBtn = cardElement.querySelector(".elements__delete-btn");
  const likeBtn = cardElement.querySelector(".elements__heart-btn");
  const likeBtnCount = cardElement.querySelector(".elements__heart-btn-count");
  cardElementImg.src = cardSrc;
  cardElementImg.id = cardId;
  cardElementImg.alt = cardName;
  cardElementTitle.textContent = cardName;
  likeBtnCount.textContent = cardlikes.length;

  if (cardlikes) {
    
    likeBtn.addEventListener("click", (e) => {
      if (!e.target.classList.contains("elements__heart-btn_active")) {
        likeCard(cardId)
          .then((elem) => {
            e.target.classList.add("elements__heart-btn_active");
            likeBtnCount.textContent = elem.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        dislikeCard(cardId)
          .then((elem) => {
            e.target.classList.remove("elements__heart-btn_active");
            likeBtnCount.textContent = elem.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    cardlikes.forEach((card) => {
      if (cardlikes.length > 0 && card._id === userId) {
        likeBtn.classList.add("elements__heart-btn_active");
      }
    });
  } else {
    likeBtnCount.textContent = 0;
  }

  if (cardownerId === userId) {
    cardDeleteBtn.style.display = "block";
    cardDeleteBtn.addEventListener("click", function (evt) {
      deleteCard(cardId)
        .then(() => {
          evt.target.closest(".elements__element").remove(cardElement);
        })
        .catch((err) => {
          console.log(err);
        });
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
  data.reverse().forEach(function (elem) {
    const card = createCard(
      elem.name,
      elem.link,
      elem._id,
      elem.likes,
      elem.owner._id
    );
  
    renderCard(card, cardsContainer);
  });
}
export { createCard, initialCards, renderCard };
