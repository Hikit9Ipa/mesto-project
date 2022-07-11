// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closePopupEsc = (evt) => this._handleEscClose(evt);
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  }
  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupEsc);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  
  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
       this.close();
      }
    });
    document.addEventListener("keydown", this._closePopupEsc);
  }
}
