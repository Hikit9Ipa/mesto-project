// Поработайте с функциональностью работы карточек и валидации форм. Всю валидацию форм вы до этого писали в отдельном файле, а работу карточек — в другом. Теперь преобразуйте функции, которые существовали ранее, в единое целое — классы Card и FormValidator. В этом пункте задания поговорим про класс Card.
// Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card. Когда дойдёте до реализации классов Popup, свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. При клике на карточку эта функция должна открывать попап с картинкой.

export class Card {
  constructor({data, userId, handleCardClick, handleDeleteCard, handleLikeCard}, cardTemplateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;

    this._userId = userId;

    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;

    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    return document
        .querySelector(this._cardTemplateSelector)
        .content
        .querySelector('.elements__element')
        .cloneNode(true);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.elements__image');
    this._buttonLike = this._cardElement.querySelector('.elements__heart-btn');
    this._likesCount = this._cardElement.querySelector('.elements__heart-btn-count');
    this._buttonDelete = this._cardElement.querySelector('.elements__delete-btn');
    this._cardImage.title = this._cardElement.querySelector('.elements__title').textContent = this._title;
    this._cardImage.src = this._cardImage.src = this._link;
    this._cardImage.alt = this._cardImage.alt = this._title;

    this._setEventListeners();
    this._hideDeleteButton();
    this.setLikeCount(this._likes);
    this._checkLike();

    return this._cardElement;
  }

  //слушатели
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
        this._handleDeleteCard();
    });

    this._buttonLike.addEventListener('click', () => {
        this._handleLikeCard();
    });

    this._cardImage.addEventListener('click', () => {
        this._handleCardClick();
    });
  }

  //удаление карточки
  deleteCard = () => {
    this._cardElement.remove(); 
  }

   //сокрытие кнопки удаления не на своей карточке
  _hideDeleteButton() {
    if (this._ownerId !== this._userId) {
        this._buttonDelete.remove();
        console.log('1')
    }
  }
  
  //находим наш лайк
  isLiked() {
    return this._likes.find(user => user._id === this._userId);
  }
  
  //если лайк наш, добавляем активный класс, иначе - удаляем его
  _checkLike() {
      this.isLiked() ? this.addLike() : this.deleteLike();
  }

  addLike = () => {
    this._buttonLike.classList.add('elements__heart-btn_active');
  }

  deleteLike = () => {
    this._buttonLike.classList.remove('elements__heart-btn_active');
  }
  
  //счетчик лайков
  setLikeCount(data) {
      this._likes = data;
      this._likesCount.textContent = this._likes.length;
  }
}


// import {
//   cardsContainer,
//   imgOpen,
//   imgBigSize,
//   imgCaption,
//   ElementElement,
// } from "./variables.js";
// import { openPopup } from "./modal.js";
// import { likeCard, dislikeCard, deleteCard } from "./api.js";
// import { userId } from "./variables.js";
// //Функция, которая вставлять карточки в указанный нами контейнер
// function renderCard(card, container) {
//   container.prepend(card);
// }

// function createCard(cardName, cardSrc, cardId, cardlikes, cardownerId) {
//   //ver.9
//   //console.log(cardName+" "+ cardSrc+" "+ cardId+" "+ cardlikes.length+" "+ cardownerId)
//   const cardElement = ElementElement.cloneNode(true);
//   const cardElementTitle = cardElement.querySelector(".elements__title");
//   const cardElementImg = cardElement.querySelector(".elements__image");
//   const cardDeleteBtn = cardElement.querySelector(".elements__delete-btn");
//   const likeBtn = cardElement.querySelector(".elements__heart-btn");
//   const likeBtnCount = cardElement.querySelector(".elements__heart-btn-count");
//   cardElementImg.src = cardSrc;
//   cardElementImg.id = cardId;
//   cardElementImg.alt = cardName;
//   cardElementTitle.textContent = cardName;
//   likeBtnCount.textContent = cardlikes.length;

//   if (cardlikes) {
    
//     likeBtn.addEventListener("click", (e) => {
//       if (!e.target.classList.contains("elements__heart-btn_active")) {
//         likeCard(cardId)
//           .then((elem) => {
//             e.target.classList.add("elements__heart-btn_active");
//             likeBtnCount.textContent = elem.likes.length;
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       } else {
//         dislikeCard(cardId)
//           .then((elem) => {
//             e.target.classList.remove("elements__heart-btn_active");
//             likeBtnCount.textContent = elem.likes.length;
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     });
//     cardlikes.forEach((card) => {
//       if (cardlikes.length > 0 && card._id === userId) {
//         likeBtn.classList.add("elements__heart-btn_active");
//       }
//     });
//   } else {
//     likeBtnCount.textContent = 0;
//   }

//   if (cardownerId === userId) {
//     cardDeleteBtn.style.display = "block";
//     cardDeleteBtn.addEventListener("click", function (evt) {
//       deleteCard(cardId)
//         .then(() => {
//           evt.target.closest(".elements__element").remove(cardElement);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   }


//   cardElementImg.addEventListener("click", (e) => {
//     openPopup(imgOpen);
//     imgBigSize.src = cardSrc;
//     imgCaption.textContent = cardName;
//     imgBigSize.alt = cardName;
//   });
//   return cardElement;
// }

// ///Функция, которая собирает данные карточки
// function initialCards(data) {
//   data.reverse().forEach(function (elem) {
//     const card = createCard(
//       elem.name,
//       elem.link,
//       elem._id,
//       elem.likes,
//       elem.owner._id
//     );
  
//     renderCard(card, cardsContainer);
//   });
// }
// export { createCard, initialCards, renderCard };


