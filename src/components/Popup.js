// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closePopupEsc = this._closePopupEsc.bind(this);
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener('keydown', this._closePopupEsc);
  }
  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closePopupEsc);
  }
  _closePopupEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
            this.close();
        }
    });
  }
}
