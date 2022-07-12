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
      this._handleCardClick(this._title, this._link);
    });
  }

  //удаление карточки
  deleteCard = () => {
    this._cardElement.remove(); 
    this._cardElement = null;
  }

   //сокрытие кнопки удаления не на своей карточке
  _hideDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._buttonDelete.remove();
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